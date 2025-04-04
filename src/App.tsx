
import { useState, useEffect } from 'react'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import { Stats } from './components/Stats'
import { Settings } from './components/Settings'
import { SoundControl } from './components/SoundControl'
import { useLocalStorage } from 'react-use'

export type TimerPhase = 'work' | 'break'
export type TimerStatus = 'running' | 'paused' | 'idle'

export interface TimerSettings {
  workDuration: number
  breakDuration: number
  soundEnabled: boolean
}

function App() {
  const [settings, setSettings] = useLocalStorage<TimerSettings>('pomodoro-settings', {
    workDuration: 25,
    breakDuration: 5,
    soundEnabled: true,
  })

  const [phase, setPhase] = useState<TimerPhase>('work')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [timeLeft, setTimeLeft] = useState(settings?.workDuration ? settings.workDuration * 60 : 1500)
  const [stats, setStats] = useLocalStorage('pomodoro-stats', {
    totalSessions: 0,
    totalWorkTime: 0,
    todayWorkTime: 0,
    lastSessionDate: null,
  })

  useEffect(() => {
    // Reset timer when phase changes
    setTimeLeft(phase === 'work' 
      ? (settings?.workDuration || 25) * 60 
      : (settings?.breakDuration || 5) * 60)
  }, [phase, settings])

  useEffect(() => {
    let interval: number | null = null

    if (status === 'running') {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Phase complete
            const newPhase = phase === 'work' ? 'break' : 'work'
            setPhase(newPhase)
            
            if (phase === 'work') {
              // Update stats when work session completes
              setStats(prev => ({
                ...prev,
                totalSessions: prev.totalSessions + 1,
                totalWorkTime: prev.totalWorkTime + (settings?.workDuration || 25),
                todayWorkTime: prev.todayWorkTime + (settings?.workDuration || 25),
                lastSessionDate: new Date().toISOString(),
              }))
            }
            
            return newPhase === 'work' 
              ? (settings?.workDuration || 25) * 60 
              : (settings?.breakDuration || 5) * 60
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [status, phase, settings])

  const toggleTimer = () => {
    setStatus(s => s === 'running' ? 'paused' : 'running')
  }

  const resetTimer = () => {
    setStatus('idle')
    setPhase('work')
    setTimeLeft((settings?.workDuration || 25) * 60)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <Timer 
            timeLeft={timeLeft} 
            phase={phase} 
            status={status}
          />
          
          <Controls 
            onToggle={toggleTimer}
            onReset={resetTimer}
            status={status}
          />

          <SoundControl 
            enabled={settings?.soundEnabled || false}
            onToggle={() => setSettings(s => ({ ...s!, soundEnabled: !s!.soundEnabled }))}
          />

          <Stats stats={stats} />
          
          <Settings 
            settings={settings!}
            onUpdate={setSettings}
          />
        </div>
      </div>
    </div>
  )
}

export default App