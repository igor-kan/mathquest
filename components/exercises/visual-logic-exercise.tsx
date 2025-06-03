"use client"

import { useState } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VisualLogicExerciseProps {
  exercise: {
    question: string
    options: string[]
    correct: string
  }
  onComplete: (correct: boolean) => void
  showFeedback: boolean
}

export function VisualLogicExercise({ exercise, onComplete, showFeedback }: VisualLogicExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSelect = (option: string) => {
    if (showFeedback) return
    setSelectedOption(option)
  }

  const handleCheck = () => {
    const correct = selectedOption === exercise.correct
    setIsCorrect(correct)
    onComplete(correct)
  }

  const renderVennDiagram = (type: string, isSelected: boolean) => {
    const baseClasses = `w-32 h-24 border-2 rounded-lg cursor-pointer transition-all ${
      isSelected ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-muted hover:border-emerald-300"
    }`

    return (
      <div className={baseClasses} onClick={() => handleSelect(type)}>
        <svg viewBox="0 0 120 80" className="w-full h-full">
          {type === "union" && (
            <>
              <circle cx="40" cy="40" r="25" fill="rgba(34, 197, 94, 0.3)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <circle cx="80" cy="40" r="25" fill="rgba(34, 197, 94, 0.3)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <text x="25" y="45" fontSize="10" fill="currentColor">
                A
              </text>
              <text x="95" y="45" fontSize="10" fill="currentColor">
                B
              </text>
            </>
          )}
          {type === "intersection" && (
            <>
              <circle cx="40" cy="40" r="25" fill="rgba(34, 197, 94, 0.1)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <circle cx="80" cy="40" r="25" fill="rgba(34, 197, 94, 0.1)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <ellipse cx="60" cy="40" rx="15" ry="20" fill="rgba(34, 197, 94, 0.5)" />
              <text x="25" y="45" fontSize="10" fill="currentColor">
                A
              </text>
              <text x="95" y="45" fontSize="10" fill="currentColor">
                B
              </text>
            </>
          )}
          {type === "difference" && (
            <>
              <circle cx="40" cy="40" r="25" fill="rgba(34, 197, 94, 0.3)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <circle
                cx="80"
                cy="40"
                r="25"
                fill="rgba(255, 255, 255, 0.8)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
              />
              <text x="25" y="45" fontSize="10" fill="currentColor">
                A
              </text>
              <text x="95" y="45" fontSize="10" fill="currentColor">
                B
              </text>
            </>
          )}
          {type === "complement" && (
            <>
              <rect
                x="5"
                y="5"
                width="110"
                height="70"
                fill="rgba(34, 197, 94, 0.3)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
              />
              <circle
                cx="60"
                cy="40"
                r="25"
                fill="rgba(255, 255, 255, 0.8)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
              />
              <text x="65" y="45" fontSize="10" fill="currentColor">
                A
              </text>
            </>
          )}
        </svg>
        <div className="text-center text-xs mt-1 capitalize">{type}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exercise.options.map((option) => (
          <div key={option} className="text-center">
            {renderVennDiagram(option, selectedOption === option)}
          </div>
        ))}
      </div>

      {!showFeedback && (
        <Button onClick={handleCheck} disabled={!selectedOption}>
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
            {isCorrect
              ? "Correct! You identified the right diagram!"
              : "Not quite. Think about what the operation represents."}
          </span>
        </div>
      )}
    </div>
  )
}
