"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Pause, 
  Square, 
  Timer, 
  Target, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  Brain,
  Lightbulb
} from "lucide-react"
import { ProgressTracker } from "@/lib/progress-tracker"

interface StudySessionProps {
  userId: string
  courseId: string
  lessonId: number
  exercises: any[]
  onComplete: (sessionData: StudySessionData) => void
}

interface StudySessionData {
  totalTime: number
  completedExercises: number
  correctAnswers: number
  streakBonus: number
  xpEarned: number
}

export function StudySession({ userId, courseId, lessonId, exercises, onComplete }: StudySessionProps) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [completedExercises, setCompletedExercises] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [exerciseStartTime, setExerciseStartTime] = useState<Date | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused])

  const startSession = () => {
    setIsActive(true)
    setSessionStartTime(new Date())
    setExerciseStartTime(new Date())
    setFeedback(null)
  }

  const pauseSession = () => {
    setIsPaused(!isPaused)
  }

  const endSession = () => {
    if (!sessionStartTime) return

    const totalTime = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000 / 60) // in minutes
    const progressTracker = ProgressTracker.getInstance()
    
    // Calculate XP and bonuses
    const baseXP = completedExercises * 10
    const accuracyBonus = Math.floor((correctAnswers / Math.max(completedExercises, 1)) * 50)
    const streakBonus = Math.floor(totalTime / 30) * 5 // 5 XP per 30 minutes
    const totalXP = baseXP + accuracyBonus + streakBonus

    // Update progress tracker
    progressTracker.updateProgress(userId, courseId, lessonId, completedExercises > 0, totalTime)

    const sessionData: StudySessionData = {
      totalTime,
      completedExercises,
      correctAnswers,
      streakBonus,
      xpEarned: totalXP
    }

    onComplete(sessionData)
    setIsActive(false)
    setIsPaused(false)
  }

  const handleExerciseComplete = (correct: boolean) => {
    setCompletedExercises((prev) => prev + 1)
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setFeedback("correct")
    } else {
      setFeedback("incorrect")
    }

    // Move to next exercise after a short delay
    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise((prev) => prev + 1)
        setExerciseStartTime(new Date())
        setFeedback(null)
        setShowHint(false)
      } else {
        endSession()
      }
    }, 2000)
  }

  const skipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1)
      setExerciseStartTime(new Date())
      setFeedback(null)
      setShowHint(false)
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = ((currentExercise + 1) / exercises.length) * 100

  if (!isActive && !sessionStartTime) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Brain className="h-6 w-6 text-emerald-500" />
            <span>Ready to Start Learning?</span>
          </CardTitle>
          <CardDescription>
            Begin your study session with {exercises.length} exercises
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{exercises.length}</div>
              <div className="text-sm text-muted-foreground">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">~{exercises.length * 2}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{exercises.length * 10}</div>
              <div className="text-sm text-muted-foreground">Potential XP</div>
            </div>
          </div>
          <Button onClick={startSession} size="lg" className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Start Study Session
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Session Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-emerald-500" />
              <span>Study Session</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-emerald-600">
                {formatTime(sessionTime)}
              </Badge>
              <Badge variant="outline">
                {currentExercise + 1} / {exercises.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{correctAnswers} correct</span>
                </div>
                <div className="flex items-center space-x-1">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{completedExercises - correctAnswers} incorrect</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={pauseSession}
                  variant="outline"
                  size="sm"
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={endSession}
                  variant="outline"
                  size="sm"
                >
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Exercise */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span>Exercise {currentExercise + 1}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleHint}
                variant="outline"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Hint
              </Button>
              <Button
                onClick={skipExercise}
                variant="outline"
                size="sm"
                disabled={currentExercise >= exercises.length - 1}
              >
                Skip
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isPaused ? (
            <div className="text-center py-8">
              <Pause className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Session paused</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-lg font-medium">
                {exercises[currentExercise]?.question || "Question loading..."}
              </div>
              
              {showHint && exercises[currentExercise]?.hint && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-700 dark:text-yellow-300">Hint</div>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        {exercises[currentExercise].hint}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exercise Component would go here */}
              <div className="min-h-[200px] border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Target className="h-8 w-8 mx-auto mb-2" />
                  <p>Exercise component would be rendered here</p>
                  <div className="mt-4 space-x-2">
                    <Button
                      onClick={() => handleExerciseComplete(true)}
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                    >
                      Correct Answer
                    </Button>
                    <Button
                      onClick={() => handleExerciseComplete(false)}
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      Wrong Answer
                    </Button>
                  </div>
                </div>
              </div>

              {feedback && (
                <div className={`p-4 rounded-lg ${
                  feedback === "correct" 
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}>
                  <div className="flex items-center space-x-2">
                    {feedback === "correct" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`font-medium ${
                      feedback === "correct" 
                        ? "text-green-700 dark:text-green-300" 
                        : "text-red-700 dark:text-red-300"
                    }`}>
                      {feedback === "correct" ? "Excellent!" : "Not quite right"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}