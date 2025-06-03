"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DragDropItem {
  id: string
  text: string
  category: string
}

interface DragDropExerciseProps {
  exercise: {
    question: string
    items: DragDropItem[]
    categories?: string[]
    targetOrder?: string[]
    solution?: string[]
  }
  onComplete: (correct: boolean) => void
  showFeedback: boolean
}

export function DragDropExercise({ exercise, onComplete, showFeedback }: DragDropExerciseProps) {
  const [draggedItem, setDraggedItem] = useState<DragDropItem | null>(null)
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: DragDropItem[] }>({})
  const [availableItems, setAvailableItems] = useState<DragDropItem[]>(exercise.items)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    // Initialize categories
    const initialDropped: { [key: string]: DragDropItem[] } = {}
    if (exercise.categories) {
      exercise.categories.forEach((category) => {
        initialDropped[category] = []
      })
    } else {
      initialDropped["statement"] = []
    }
    setDroppedItems(initialDropped)
  }, [exercise])

  const handleDragStart = (item: DragDropItem) => {
    setDraggedItem(item)
  }

  const handleDrop = (category: string) => {
    if (!draggedItem) return

    // Remove from available items
    setAvailableItems((prev) => prev.filter((item) => item.id !== draggedItem.id))

    // Add to dropped items
    setDroppedItems((prev) => ({
      ...prev,
      [category]: [...prev[category], draggedItem],
    }))

    setDraggedItem(null)
  }

  const handleRemoveItem = (item: DragDropItem, category: string) => {
    // Remove from dropped items
    setDroppedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((i) => i.id !== item.id),
    }))

    // Add back to available items
    setAvailableItems((prev) => [...prev, item])
  }

  const handleCheck = () => {
    let correct = false

    if (exercise.targetOrder) {
      // Check if items are in correct order
      const statement = droppedItems["statement"] || []
      const order = statement.map((item) => item.text)
      correct = JSON.stringify(order) === JSON.stringify(exercise.targetOrder)
    } else if (exercise.solution) {
      // Check if correct items are in result category
      const result = droppedItems["result"] || []
      const resultTexts = result.map((item) => item.text).sort()
      const solutionSorted = [...exercise.solution].sort()
      correct = JSON.stringify(resultTexts) === JSON.stringify(solutionSorted)
    } else {
      // Check categories
      correct = exercise.items.every((item) => {
        const category = Object.keys(droppedItems).find((cat) =>
          droppedItems[cat].some((dropped) => dropped.id === item.id),
        )
        return category === item.category
      })
    }

    setIsCorrect(correct)
    onComplete(correct)
  }

  const handleReset = () => {
    setAvailableItems(exercise.items)
    const resetDropped: { [key: string]: DragDropItem[] } = {}
    if (exercise.categories) {
      exercise.categories.forEach((category) => {
        resetDropped[category] = []
      })
    } else {
      resetDropped["statement"] = []
    }
    setDroppedItems(resetDropped)
    setIsCorrect(null)
  }

  const canCheck = exercise.categories
    ? Object.values(droppedItems).some((items) => items.length > 0)
    : droppedItems["statement"]?.length > 0

  return (
    <div className="space-y-6">
      {/* Available Items */}
      <div className="space-y-2">
        <h3 className="font-medium">Available Items:</h3>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border-2 border-dashed border-muted rounded-lg">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md cursor-move hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="space-y-4">
        {exercise.categories ? (
          exercise.categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="font-medium capitalize">{category}:</h3>
              <div
                className="min-h-[80px] p-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg bg-emerald-50 dark:bg-emerald-900/10"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(category)}
              >
                <div className="flex flex-wrap gap-2">
                  {droppedItems[category]?.map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-md cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                      onClick={() => handleRemoveItem(item, category)}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            <h3 className="font-medium">Build the statement:</h3>
            <div
              className="min-h-[80px] p-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg bg-emerald-50 dark:bg-emerald-900/10"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop("statement")}
            >
              <div className="flex flex-wrap gap-2">
                {droppedItems["statement"]?.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-md cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                    onClick={() => handleRemoveItem(item, "statement")}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!showFeedback && (
          <>
            <Button onClick={handleCheck} disabled={!canCheck}>
              Check Answer
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
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
            {isCorrect ? "Excellent! You got it right!" : "Not quite right. Try rearranging the items."}
          </span>
        </div>
      )}
    </div>
  )
}
