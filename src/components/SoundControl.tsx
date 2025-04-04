
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface SoundControlProps {
  enabled: boolean
  onToggle: () => void
}

export function SoundControl({ enabled, onToggle }: SoundControlProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors absolute top-4 right-4"
    >
      {enabled ? (
        <Volume2 className="w-6 h-6" />
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </motion.button>
  )
}