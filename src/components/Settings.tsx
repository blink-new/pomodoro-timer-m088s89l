
import * as Slider from '@radix-ui/react-slider'
import { TimerSettings } from '../App'

interface SettingsProps {
  settings: TimerSettings
  onUpdate: (settings: TimerSettings) => void
}

export function Settings({ settings, onUpdate }: SettingsProps) {
  return (
    <div className="bg-white/10 rounded-lg p-6 my-8">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Work Duration (minutes)</label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[settings.workDuration]}
            onValueChange={(value) => onUpdate({ ...settings, workDuration: value[0] })}
            max={60}
            min={1}
            step={1}
          >
            <Slider.Track className="bg-white/20 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Work duration"
            />
          </Slider.Root>
          <span className="text-sm mt-1 block">{settings.workDuration} minutes</span>
        </div>

        <div>
          <label className="block text-sm mb-2">Break Duration (minutes)</label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[settings.breakDuration]}
            onValueChange={(value) => onUpdate({ ...settings, breakDuration: value[0] })}
            max={30}
            min={1}
            step={1}
          >
            <Slider.Track className="bg-white/20 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Break duration"
            />
          </Slider.Root>
          <span className="text-sm mt-1 block">{settings.breakDuration} minutes</span>
        </div>
      </div>
    </div>
  )
}