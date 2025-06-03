import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/course-data"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = courses[params.courseId]

  if (!course) {
    return <div>Course not found</div>
  }

  const totalLessons = Object.keys(course.lessons).length
  const completedLessons = 0 // This would come from user progress data

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/courses" className="flex items-center gap-2 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{course.level}</Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {totalLessons} lessons
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
                </div>
                <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
              </div>
              <Button size="lg">{completedLessons === 0 ? "Start Course" : "Continue"}</Button>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Course Lessons</h2>
            <div className="grid gap-4">
              {Object.entries(course.lessons).map(([lessonId, lesson]) => (
                <Card key={lessonId} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          Lesson {lessonId}: {lesson.title}
                        </CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {lesson.content.exercises.length} exercises
                      </Badge>
                    </div>
                  </CardHeader>

                  {lesson.story && (
                    <CardContent className="pt-0">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{lesson.story.setting}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.story.scenario}</p>
                      </div>
                    </CardContent>
                  )}

                  <CardFooter>
                    <Link href={`/courses/${course.id}/lesson/${lessonId}`} className="w-full">
                      <Button className="w-full">
                        {Number(lessonId) <= completedLessons + 1 ? "Start Lesson" : "Locked"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
