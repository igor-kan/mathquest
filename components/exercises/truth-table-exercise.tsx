"use client"

import { useState } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TruthTableExerciseProps {
  exercise: {
    question: string
    formula: string
    variables: string[]
  }
  onComplete: (correct: boolean) => void
  showFeedback: boolean
}

export function TruthTableExercise({ exercise, onComplete, showFeedback }: TruthTableExerciseProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean | null }>({})
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Generate all possible combinations of truth values
  const generateRows = () => {
    const numVars = exercise.variables.length
    const rows = []
    for (let i = 0; i < Math.pow(2, numVars); i++) {
      const row: { [key: string]: boolean } = {}
      for (let j = 0; j < numVars; j++) {
        row[exercise.variables[j]] = Boolean(i & (1 << (numVars - 1 - j)))
      }
      rows.push(row)
    }
    return rows
  }

  const evaluateFormula = (row: { [key: string]: boolean }) => {
    // Simple evaluation for basic formulas
    if (exercise.formula === "p ∧ q") {
      return row.p && row.q
    }
    if (exercise.formula === "p ∨ q") {
      return row.p || row.q
    }
    if (exercise.formula === "¬p") {
      return !row.p
    }
    if (exercise.formula === "p → q") {
      return !row.p || row.q
    }
    if (exercise.formula === "p ↔ q") {
      return row.p === row.q
    }
    return false
  }

  const rows = generateRows()

  const handleCellChange = (rowIndex: number, value: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [rowIndex]: value,
    }))
  }

  const handleCheck = () => {
    let correct = true
    rows.forEach((row, index) => {
      const expectedResult = evaluateFormula(row)
      if (userAnswers[index] !== expectedResult) {
        correct = false
      }
    })
    setIsCorrect(correct)
    onComplete(correct)
  }

  const allAnswered = rows.every((_, index) => userAnswers[index] !== undefined && userAnswers[index] !== null)

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-muted">
          <thead>
            <tr className="bg-muted/50">
              {exercise.variables.map((variable) => (
                <th key={variable} className="border border-muted p-2 text-center font-medium">
                  {variable}
                </th>
              ))}
              <th className="border border-muted p-2 text-center font-medium">{exercise.formula}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-muted/25">
                {exercise.variables.map((variable) => (
                  <td key={variable} className="border border-muted p-2 text-center">
                    {row[variable] ? "T" : "F"}
                  </td>
                ))}
                <td className="border border-muted p-2 text-center">
                  {showFeedback ? (
                    <span
                      className={`font-medium ${
                        userAnswers[rowIndex] === evaluateFormula(row) ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {userAnswers[rowIndex] ? "T" : "F"}
                    </span>
                  ) : (
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleCellChange(rowIndex, true)}
                        className={`px-2 py-1 rounded text-xs ${
                          userAnswers[rowIndex] === true ? "bg-emerald-500 text-white" : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        T
                      </button>
                      <button
                        onClick={() => handleCellChange(rowIndex, false)}
                        className={`px-2 py-1 rounded text-xs ${
                          userAnswers[rowIndex] === false ? "bg-emerald-500 text-white" : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        F
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showFeedback && (
        <Button onClick={handleCheck} disabled={!allAnswered}>
          Check Truth Table
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
              ? "Perfect! Your truth table is correct!"
              : "Some values are incorrect. Review the logical connective."}
          </span>
        </div>
      )}
    </div>
  )
}
