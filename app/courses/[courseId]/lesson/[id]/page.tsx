"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, HelpCircle, X, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DragDropExercise } from "@/components/exercises/drag-drop-exercise"
import { ProofBuilderExercise } from "@/components/exercises/proof-builder-exercise"
import { VisualLogicExercise } from "@/components/exercises/visual-logic-exercise"
import { TruthTableExercise } from "@/components/exercises/truth-table-exercise"
import { courses } from "@/lib/course-data"

export default function LessonPage({ params }: { params: { courseId: string; id: string } }) {
  const course = courses[params.courseId]
  const lessonId = Number.parseInt(params.id)
  const lesson = course?.lessons[lessonId]

  const [currentExercise, setCurrentExercise] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)

  if (!course || !lesson) {
    return <div>Lesson not found</div>
  }

  const handleExerciseComplete = (correct: boolean) => {
    const newResults = [...exerciseResults]
    newResults[currentExercise] = correct
    setExerciseResults(newResults)
    setShowFeedback(true)

    if (currentExercise === lesson.content.exercises.length - 1) {
      setLessonComplete(true)
    }
  }

  const handleContinue = () => {
    setShowFeedback(false)
    if (currentExercise < lesson.content.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }

  const currentExerciseData = lesson.content.exercises[currentExercise]
  const progress = ((currentExercise + (showFeedback ? 1 : 0)) / lesson.content.exercises.length) * 100

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href={`/courses/${course.id}`} className="flex items-center gap-2 font-semibold">
            <ChevronLeft className="h-4 w-4" />
            Back to {course.title}
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block">
              <Progress value={progress} className="h-2 w-40" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold md:text-3xl">
              Lesson {lessonId}: {lesson.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              Exercise {currentExercise + 1} of {lesson.content.exercises.length}
            </div>
          </div>

          <Tabs defaultValue="lesson" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lesson">Theory</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lesson.story && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 mb-6">
                      <h3 className="font-semibold mb-2">📍 {lesson.story.setting}</h3>
                      <p className="text-sm italic mb-2">{lesson.story.scenario}</p>
                      <div className="flex gap-2">
                        {lesson.story.characters.map((character, index) => (
                          <span key={index} className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                            {character}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {lesson.content.theory.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" disabled={lessonId <= 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>
                <Link href={`/courses/${course.id}/lesson/${lessonId + 1}`}>
                  <Button>
                    Next Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              {!lessonComplete ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-emerald-600" />
                      Practice Exercise {currentExercise + 1}
                    </CardTitle>
                    <CardDescription>{currentExerciseData.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentExerciseData.type === "story-choice" && (
                      <StoryChoiceExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                    {currentExerciseData.type === "multiple-choice" && (
                      <MultipleChoiceExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                    {currentExerciseData.type === "drag-drop" && (
                      <DragDropExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                    {currentExerciseData.type === "proof-builder" && (
                      <ProofBuilderExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                    {currentExerciseData.type === "visual-logic" && (
                      <VisualLogicExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                    {currentExerciseData.type === "truth-table" && (
                      <TruthTableExercise
                        exercise={currentExerciseData}
                        onComplete={handleExerciseComplete}
                        showFeedback={showFeedback}
                      />
                    )}
                  </CardContent>
                  {showFeedback && (
                    <CardFooter>
                      <Button onClick={handleContinue} className="w-full">
                        {currentExercise === lesson.content.exercises.length - 1 ? "Complete Lesson" : "Continue"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
                      <h2 className="text-2xl font-bold">Lesson Complete!</h2>
                      <p className="text-muted-foreground">
                        Great job! You've completed all exercises for this lesson.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Link href={`/courses/${course.id}/lesson/${lessonId + 1}`}>
                          <Button>Next Lesson</Button>
                        </Link>
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="outline">Back to Course</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                  <CardDescription>Add your own notes for this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Type your notes here..."
                    defaultValue={`Lesson ${lessonId}: ${lesson.title}

Key concepts:
- ${lesson.description}

Important points:
- 

Questions to review:
- 

Practice needed:
- `}
                  />
                </CardContent>
                <CardFooter>
                  <Button>Save Notes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Exercise Components
function MultipleChoiceExercise({ exercise, onComplete, showFeedback }: any) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleCheck = () => {
    const correct = selectedAnswer === exercise.correct.toString()
    setIsCorrect(correct)
    onComplete(correct)
  }

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
        {exercise.options.map((option: string, index: number) => (
          <div key={index} className="flex items-start space-x-2 rounded-md border p-3">
            <RadioGroupItem value={index.toString()} id={index.toString()} className="mt-1" />
            <div className="space-y-1 flex-1">
              <label htmlFor={index.toString()} className="font-medium cursor-pointer">
                {option}
              </label>
              {showFeedback && selectedAnswer === index.toString() && (
                <p className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {index === exercise.correct ? exercise.explanation : "Not quite right. Try again!"}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
      {!showFeedback && (
        <Button onClick={handleCheck} disabled={!selectedAnswer}>
          Check Answer
        </Button>
      )}
      {showFeedback && (
        <div
          className={`flex items-center rounded-md p-3 ${isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
        >
          {isCorrect ? (
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          ) : (
            <X className="mr-2 h-5 w-5 text-red-500" />
          )}
          <span
            className={`font-medium ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
          >
            {isCorrect ? "Correct!" : "Not quite right."}
          </span>
        </div>
      )}
    </div>
  )
}

function StoryChoiceExercise({ exercise, onComplete, showFeedback }: any) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleCheck = () => {
    const correct = selectedAnswer === exercise.correct.toString()
    setIsCorrect(correct)
    onComplete(correct)
  }

  return (
    <div className="space-y-4">
      {exercise.scenario && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm italic">{exercise.scenario}</p>
        </div>
      )}

      <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
        {exercise.options.map((option: string, index: number) => (
          <div key={index} className="flex items-start space-x-2 rounded-md border p-3">
            <RadioGroupItem value={index.toString()} id={index.toString()} className="mt-1" />
            <div className="space-y-1 flex-1">
              <label htmlFor={index.toString()} className="font-medium cursor-pointer">
                {option}
              </label>
              {showFeedback && selectedAnswer === index.toString() && (
                <p className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {index === exercise.correct ? exercise.explanation : "Not quite right. Try again!"}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
      {!showFeedback && (
        <Button onClick={handleCheck} disabled={!selectedAnswer}>
          Check Answer
        </Button>
      )}
      {showFeedback && (
        <div
          className={`flex items-center rounded-md p-3 ${isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
        >
          {isCorrect ? (
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          ) : (
            <X className="mr-2 h-5 w-5 text-red-500" />
          )}
          <span
            className={`font-medium ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
          >
            {isCorrect ? "Correct!" : "Not quite right."}
          </span>
        </div>
      )}
    </div>
  )
}
