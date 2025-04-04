
import { TimerPhase, TimerStatus } from '../App'
import { motion } from 'framer-motion'

interface TimerProps {
  timeLeft: number
  phase: TimerPhase
  status: TimerStatus
}

export function Timer({ timeLeft, phase, status }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const progress = phase === 'work'
    ? (timeLeft / (25 * 60)) * 100
    : (timeLeft / (5 * 60)) * 100

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div 
        className="relative w-64 h-64"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-current text-white/20"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-current text-white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}%`}
            strokeDashoffset={`${((100 - progress) / 100) * 2 * Math.PI * 45}%`}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-xl mt-2 capitalize">{phase} Phase</span>
          <span className="text-sm mt-1 opacity-75 capitalize">{status}</span>
        </div>
      </motion.div>
    </div>
  )
}