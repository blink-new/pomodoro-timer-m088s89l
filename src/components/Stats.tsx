
interface StatsProps {
  stats: {
    totalSessions: number
    totalWorkTime: number
    todayWorkTime: number
    lastSessionDate: string | null
  }
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-sm opacity-75">Total Sessions</h3>
        <p className="text-2xl font-bold">{stats.totalSessions}</p>
      </div>
      
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-sm opacity-75">Today's Focus Time</h3>
        <p className="text-2xl font-bold">{stats.todayWorkTime} mins</p>
      </div>
      
      <div className="bg-white/10 rounded-lg p-4 col-span-2">
        <h3 className="text-sm opacity-75">Total Focus Time</h3>
        <p className="text-2xl font-bold">{stats.totalWorkTime} mins</p>
      </div>
    </div>
  )
}