import Link from "next/link"
import type { ReactNode } from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  title: string
  description: string
  image: string
  progress: number
  lessons: number
  level: string
  href: string
  icon: ReactNode
}

export function CourseCard({ title, description, image, progress, lessons, level, href, icon }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {icon}
            <span>{lessons} lessons</span>
          </div>
          <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-400">
            {level}
          </div>
        </div>
        <h3 className="line-clamp-1 text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {progress > 0 ? (
          <div className="w-full space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-emerald-100" indicatorClassName="bg-emerald-600" />
          </div>
        ) : (
          <Link href={href} className="w-full">
            <button className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
              Start Course
            </button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
