"use client"

import { useState } from "react"
import { CheckCircle, X, ArrowDown, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProofBuilderExerciseProps {
  exercise: {
    question: string
    steps: string[]
  }
  onComplete: (correct: boolean) => void
  showFeedback: boolean
}

export function ProofBuilderExercise({ exercise, onComplete, showFeedback }: ProofBuilderExerciseProps) {
  const [currentSteps, setCurrentSteps] = useState<string[]>([])
  const [availableSteps, setAvailableSteps] = useState<string[]>([...exercise.steps].sort(() => Math.random() - 0.5))
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [draggedStep, setDraggedStep] = useState<string | null>(null)

  const handleDragStart = (step: string) => {
    setDraggedStep(step)
  }

  const handleDrop = (index: number) => {
    if (!draggedStep) return

    const newCurrentSteps = [...currentSteps]
    newCurrentSteps.splice(index, 0, draggedStep)
    setCurrentSteps(newCurrentSteps)

    setAvailableSteps((prev) => prev.filter((step) => step !== draggedStep))
    setDraggedStep(null)
  }

  const handleRemoveStep = (index: number) => {
    const step = currentSteps[index]
    setCurrentSteps((prev) => prev.filter((_, i) => i !== index))
    setAvailableSteps((prev) => [...prev, step])
  }

  const handleCheck = () => {
    const correct = JSON.stringify(currentSteps) === JSON.stringify(exercise.steps)
    setIsCorrect(correct)
    onComplete(correct)
  }

  const handleReset = () => {
    setCurrentSteps([])
    setAvailableSteps([...exercise.steps].sort(() => Math.random() - 0.5))
    setIsCorrect(null)
  }

  return (
    <div className="space-y-6">
      {/* Available Steps */}
      <div className="space-y-2">
        <h3 className="font-medium">Available Steps:</h3>
        <div className="space-y-2 min-h-[100px] p-4 border-2 border-dashed border-muted rounded-lg">
          {availableSteps.map((step, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(step)}
              className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md cursor-move hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-2"
            >
              <GripVertical className="h-4 w-4" />
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Construction Area */}
      <div className="space-y-2">
        <h3 className="font-medium">Proof Steps (in order):</h3>
        <div className="space-y-2 min-h-[200px] p-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg bg-emerald-50 dark:bg-emerald-900/10">
          {currentSteps.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">Drag steps here to build your proof</div>
          ) : (
            currentSteps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-md cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-start gap-2"
                  onClick={() => handleRemoveStep(index)}
                >
                  <span className="font-mono text-xs bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm flex-1">{step}</span>
                </div>
                {index < currentSteps.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                {/* Drop zone between steps */}
                <div
                  className="h-2 border-2 border-dashed border-transparent hover:border-emerald-400 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index + 1)}
                />
              </div>
            ))
          )}
          {/* Drop zone at the beginning */}
          <div
            className="h-2 border-2 border-dashed border-transparent hover:border-emerald-400 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(0)}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!showFeedback && (
          <>
            <Button onClick={handleCheck} disabled={currentSteps.length === 0}>
              Check Proof
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </>
        )}
      </div>

      {/* Feedback */}
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
            {isCorrect ? "Perfect! Your proof is logically sound!" : "The steps aren't in the right order. Try again!"}
          </span>
        </div>
      )}
    </div>
  )
}
