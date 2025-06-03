import { Flame } from "lucide-react"

interface DailyStreakProps {
  streak: number
}

export function DailyStreak({ streak }: DailyStreakProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-400">
      <Flame className="h-3 w-3 text-amber-500" />
      <span>{streak} day streak</span>
    </div>
  )
}
