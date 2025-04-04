
import { Play, Pause, RotateCcw } from 'lucide-react'
import { TimerStatus } from '../App'
import { motion } from 'framer-motion'

interface ControlsProps {
  onToggle: () => void
  onReset: () => void
  status: TimerStatus
}

export function Controls({ onToggle, onReset, status }: ControlsProps) {
  return (
    <div className="flex justify-center gap-4 my-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors"
      >
        {status === 'running' ? (
          <Pause className="w-8 h-8" />
        ) : (
          <Play className="w-8 h-8" />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors"
      >
        <RotateCcw className="w-8 h-8" />
      </motion.button>
    </div>
  )
}