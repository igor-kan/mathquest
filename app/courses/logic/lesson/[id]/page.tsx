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

// Lesson data structure
const lessons = {
  1: {
    title: "What Makes a Proposition?",
    description: "Learn to identify valid logical statements",
    story: {
      setting: "Detective Academy Training",
      scenario:
        "You're a new detective learning to analyze witness statements. Not all statements can be used as evidence in court - only those that are clearly true or false.",
      characters: ["Detective Smith", "Witness A", "Judge"],
    },
    content: {
      theory: `Welcome to Detective Academy! 🕵️

A **proposition** is a statement that is either true or false, but not both. Think of it as evidence that can be verified in court.

**Valid Propositions (Admissible Evidence):**
• "The suspect was wearing a red jacket" ✓
• "The crime occurred at 3:15 PM" ✓  
• "There were 5 witnesses present" ✓

**Invalid Propositions (Inadmissible):**
• "What time did you arrive?" ❌ (Question)
• "Please close the door!" ❌ (Command)
• "The suspect looked suspicious" ❌ (Opinion)
• "x + 1 = 5" ❌ (Depends on x)

**Your Mission:** Help Detective Smith sort witness statements into admissible and inadmissible evidence.`,

      exercises: [
        {
          type: "story-choice",
          scenario: "Witness A says: 'The getaway car was blue.' Can this be used as evidence?",
          question: "Is this statement a valid proposition?",
          options: [
            "Yes - it's either true or false",
            "No - it's just an opinion",
            "No - we need more details",
            "Maybe - depends on lighting",
          ],
          correct: 0,
          explanation:
            "Correct! 'The getaway car was blue' is a proposition because it makes a definite claim that can be verified as true or false.",
          feedback: {
            success:
              "Detective Smith nods approvingly. 'Excellent work! This statement can be verified by checking security footage.'",
            failure:
              "Detective Smith shakes his head. 'Remember, a proposition must have a definite truth value, regardless of whether we can currently verify it.'",
          },
        },
        {
          type: "drag-drop",
          scenario: "Sort these witness statements into the correct categories:",
          question: "Drag each statement to 'Admissible Evidence' or 'Inadmissible'",
          items: [
            { id: "1", text: "The clock showed 2:30 PM", category: "admissible" },
            { id: "2", text: "What did you see next?", category: "inadmissible" },
            { id: "3", text: "Call the police immediately!", category: "inadmissible" },
            { id: "4", text: "There were exactly 3 people in the room", category: "admissible" },
            { id: "5", text: "The music was too loud", category: "inadmissible" },
            { id: "6", text: "The door was locked", category: "admissible" },
          ],
          categories: ["admissible", "inadmissible"],
          feedback: {
            success:
              "Perfect! You've correctly identified which statements can serve as logical propositions in our investigation.",
            failure:
              "Some statements were misclassified. Remember: propositions must be definitively true or false, not questions, commands, or subjective opinions.",
          },
        },
      ],
    },
  },

  2: {
    title: "Logical Connectives: Building Complex Evidence",
    description: "Combine simple statements using AND, OR, and NOT",
    story: {
      setting: "Crime Scene Investigation",
      scenario:
        "You're analyzing a complex case where multiple pieces of evidence must be combined to reach conclusions.",
      characters: ["Detective Smith", "Forensics Team", "Prosecutor"],
    },
    content: {
      theory: `🔍 **Case File: The Museum Heist**

Sometimes we need to combine evidence to build a stronger case. Logical connectives help us do this precisely.

**The Logical Connectives:**

**Conjunction (∧) - "AND"**
• Both conditions must be true
• "The alarm was triggered AND the window was broken"
• Symbol: ∧ (like an upside-down V)

**Disjunction (∨) - "OR"** 
• At least one condition must be true
• "The thief entered through the window OR the door"
• Symbol: ∨ (like a V)

**Negation (¬) - "NOT"**
• The opposite of the statement
• "The security guard was NOT at his post"
• Symbol: ¬

**Truth Conditions:**
• P ∧ Q is true only when both P and Q are true
• P ∨ Q is true when at least one of P or Q is true  
• ¬P is true when P is false

**Your Mission:** Help build the case by correctly combining evidence using logical connectives.`,

      exercises: [
        {
          type: "truth-table",
          scenario: "The prosecutor needs to understand when 'The suspect was present AND had the key' is true.",
          question: "Complete the truth table for P ∧ Q (where P = 'suspect present', Q = 'had key'):",
          formula: "P ∧ Q",
          variables: ["P", "Q"],
          story_context: {
            P: "The suspect was present at the scene",
            Q: "The suspect had a key to the building",
          },
        },
        {
          type: "visual-logic",
          scenario: "The forensics team found evidence that the thief entered through 'the window OR the door'.",
          question: "Which diagram represents the logical OR (∨) operation?",
          options: ["union", "intersection", "complement", "difference"],
          correct: "union",
          story_context:
            "Think about all the ways the thief could have entered - through the window, through the door, or through both.",
        },
        {
          type: "drag-drop",
          scenario: "Build the logical statement: 'The alarm was triggered AND the guard was NOT present'",
          question: "Arrange the symbols to form: Alarm ∧ ¬Guard",
          items: [
            { id: "1", text: "Alarm", category: "statement" },
            { id: "2", text: "∧", category: "statement" },
            { id: "3", text: "¬", category: "statement" },
            { id: "4", text: "Guard", category: "statement" },
            { id: "5", text: "∨", category: "unused" },
          ],
          targetOrder: ["Alarm", "∧", "¬", "Guard"],
          categories: ["statement", "unused"],
        },
      ],
    },
  },

  3: {
    title: "Quantifiers: Statements About Groups",
    description: "Express statements about 'all' and 'some' using ∀ and ∃",
    story: {
      setting: "University Mathematics Department",
      scenario:
        "Professor Chen is teaching a logic class, and students need to understand how to make precise statements about groups of objects.",
      characters: ["Professor Chen", "Students", "Teaching Assistant"],
    },
    content: {
      theory: `📚 **Professor Chen's Logic Class**

"Welcome, students! Today we learn about quantifiers - powerful tools for making statements about groups."

**Universal Quantifier (∀) - "For All"**
• Makes a statement about every member of a group
• ∀x Student(x) → Smart(x) means "All students are smart"
• Symbol: ∀ (upside-down A for "All")

**Existential Quantifier (∃) - "There Exists"**
• Makes a statement about at least one member of a group  
• ∃x Student(x) ∧ Tall(x) means "There exists a student who is tall"
• Symbol: ∃ (backwards E for "Exists")

**Real Examples:**
• ∀x (Cat(x) → Mammal(x)) - "All cats are mammals"
• ∃x (Bird(x) ∧ ¬Fly(x)) - "Some birds cannot fly"
• ∀x (Prime(x) ∧ Even(x) → x = 2) - "The only even prime is 2"

**Negation Rules:**
• ¬∀x P(x) ≡ ∃x ¬P(x) - "Not all" means "some are not"
• ¬∃x P(x) ≡ ∀x ¬P(x) - "None exist" means "all are not"

**Your Mission:** Help Professor Chen's students master quantified statements.`,

      exercises: [
        {
          type: "story-choice",
          scenario: "Professor Chen asks: 'How do we say that every student in this class passed the exam?'",
          question: "Which statement correctly expresses this?",
          options: [
            "∀x (Student(x) → Passed(x))",
            "∃x (Student(x) ∧ Passed(x))",
            "∀x (Student(x) ∧ Passed(x))",
            "∃x (Student(x) → Passed(x))",
          ],
          correct: 0,
          explanation:
            "Correct! We use ∀ for 'all' and → for 'if...then' to say 'for all x, if x is a student, then x passed.'",
          feedback: {
            success:
              "Professor Chen smiles. 'Excellent! You understand that we need the implication to properly restrict our statement to students.'",
            failure:
              "Professor Chen explains: 'Remember, we want to say something about ALL students, so we need ∀, and we use → to connect being a student with passing.'",
          },
        },
        {
          type: "drag-drop",
          scenario: "A student wants to say: 'There exists a number that is both prime and even.'",
          question: "Build the statement: ∃x (Prime(x) ∧ Even(x))",
          items: [
            { id: "1", text: "∃x", category: "statement" },
            { id: "2", text: "∀x", category: "unused" },
            { id: "3", text: "(Prime(x)", category: "statement" },
            { id: "4", text: "∧", category: "statement" },
            { id: "5", text: "∨", category: "unused" },
            { id: "6", text: "Even(x))", category: "statement" },
          ],
          targetOrder: ["∃x", "(Prime(x)", "∧", "Even(x))"],
          categories: ["statement", "unused"],
          feedback: {
            success:
              "Perfect! The student has correctly expressed that there exists at least one number that is both prime and even (which is true - the number 2).",
            failure: "Not quite right. Remember: ∃ for 'there exists', and ∧ to combine both properties.",
          },
        },
        {
          type: "proof-builder",
          scenario: "Professor Chen challenges the class: 'Prove that ¬∀x P(x) is equivalent to ∃x ¬P(x)'",
          question: "Arrange the proof steps in logical order:",
          steps: [
            "Assume ¬∀x P(x) (not all x satisfy P)",
            "This means it's false that P(x) holds for every x",
            "Therefore, there must be at least one x where P(x) is false",
            "In other words, there exists an x such that ¬P(x)",
            "Hence ∃x ¬P(x)",
            "The equivalence ¬∀x P(x) ≡ ∃x ¬∀x P(x) is proven",
          ],
          feedback: {
            success: "Brilliant! You've proven one of the fundamental equivalences in predicate logic.",
            failure: "The logical flow isn't quite right. Think about how 'not all' naturally leads to 'some are not'.",
          },
        },
      ],
    },
  },

  4: {
    title: "Proof by Contradiction: The Impossible Truth",
    description: "Learn to prove statements by showing their negation leads to absurdity",
    story: {
      setting: "Ancient Greek Academy",
      scenario:
        "You're studying with the great mathematicians of antiquity, learning one of their most powerful proof techniques.",
      characters: ["Euclid", "Aristotle", "Student Mathematicians"],
    },
    content: {
      theory: `🏛️ **The Academy of Ancient Wisdom**

Euclid approaches the class with a knowing smile...

"Students, today I teach you *reductio ad absurdum* - proof by contradiction. When direct proof seems impossible, we assume the opposite and show it leads to nonsense!"

**The Method:**
1. **Assume the negation** of what you want to prove
2. **Use logical reasoning** to derive consequences  
3. **Find a contradiction** - something that cannot be true
4. **Conclude** the assumption must be false
5. **Therefore** the original statement must be true

**When to Use:**
• Proving negative statements ("There is no largest prime")
• Proving uniqueness ("The solution is unique")  
• Proving irrationality ("√2 is irrational")
• When direct proof seems difficult

**Classic Example: √2 is Irrational**
1. Assume √2 is rational (can be written as a/b in lowest terms)
2. Then √2 = a/b where gcd(a,b) = 1
3. Squaring: 2 = a²/b², so 2b² = a²
4. This means a² is even, so a is even
5. Let a = 2k, then 2b² = 4k², so b² = 2k²
6. This means b² is even, so b is even
7. **Contradiction!** Both a and b are even, but gcd(a,b) = 1
8. Therefore √2 must be irrational

**Your Mission:** Master this ancient technique by solving logical puzzles.`,

      exercises: [
        {
          type: "story-choice",
          scenario: "Euclid asks: 'What is always the first step in proof by contradiction?'",
          question: "How do we begin a proof by contradiction?",
          options: [
            "State what we want to prove directly",
            "Assume the negation of what we want to prove",
            "Look for a counterexample",
            "Use mathematical induction",
          ],
          correct: 1,
          explanation:
            "Correct! We always start by assuming the opposite of what we want to prove, then show this leads to a logical impossibility.",
          feedback: {
            success:
              "Euclid nods approvingly. 'Yes! By assuming the opposite, we set up the conditions to find our contradiction.'",
            failure:
              "Euclid strokes his beard thoughtfully. 'Remember, the power of this method comes from assuming what we don't want to be true.'",
          },
        },
        {
          type: "proof-builder",
          scenario: "Euclid presents a famous theorem: 'There are infinitely many prime numbers.'",
          question: "Arrange Euclid's proof steps in the correct order:",
          steps: [
            "Assume there are only finitely many primes: p₁, p₂, ..., pₙ",
            "Consider the number N = (p₁ × p₂ × ... × pₙ) + 1",
            "N is larger than all the primes in our assumed finite list",
            "When we divide N by any prime pᵢ, we get remainder 1",
            "So N is not divisible by any prime in our list",
            "Therefore N is either prime itself, or divisible by a prime not in our list",
            "Either way, we found a prime not in our 'complete' list",
            "Contradiction! Our assumption of finitely many primes must be false",
            "Therefore, there are infinitely many prime numbers",
          ],
          feedback: {
            success:
              "Magnificent! You've reconstructed one of the most elegant proofs in all of mathematics. Euclid himself would be proud!",
            failure:
              "The logical flow needs adjustment. Think about how each step builds toward the inevitable contradiction.",
          },
        },
        {
          type: "interactive-proof",
          scenario: "Practice with a simpler example: Prove that there is no largest even number.",
          question: "Complete the proof by filling in the missing steps:",
          proof_template: [
            "Assume there exists a largest even number, call it E",
            "Consider the number _____ (what number should we consider?)",
            "This number is _____ than E (greater/less/equal?)",
            "This number is _____ (even/odd?)",
            "This contradicts our assumption that E was the _____ even number",
            "Therefore, there is no largest even number",
          ],
          answers: ["E + 2", "greater", "even", "largest"],
          feedback: {
            success:
              "Excellent reasoning! You've shown that for any 'largest' even number, we can always find a larger one.",
            failure: "Think about what happens when you add 2 to any even number...",
          },
        },
      ],
    },
  },

  5: {
    title: "Set Theory: The Foundation of Mathematics",
    description: "Explore collections, membership, and set operations",
    story: {
      setting: "Cantor's Study",
      scenario:
        "You're visiting Georg Cantor, the father of set theory, in his study filled with mathematical manuscripts and infinite puzzles.",
      characters: ["Georg Cantor", "Mathematical Colleagues", "Students"],
    },
    content: {
      theory: `📜 **Cantor's Revolutionary Ideas**

Georg Cantor looks up from his manuscripts...

"Welcome! I've been developing a theory about collections - what I call 'sets'. These simple ideas will revolutionize all of mathematics!"

**What is a Set?**
A set is simply a collection of distinct objects, called elements or members.

**Notation:**
• A = {1, 2, 3, 4, 5} - roster notation (list the elements)
• B = {x | x is an even integer} - set-builder notation (describe the property)
• a ∈ A means "a is an element of A"
• a ∉ A means "a is not an element of A"

**Special Sets:**
• ∅ or {} - the empty set (contains nothing)
• ℕ = {1, 2, 3, ...} - natural numbers
• ℤ = {..., -2, -1, 0, 1, 2, ...} - integers  
• ℚ - rational numbers (fractions)
• ℝ - real numbers

**Set Operations:**
• **Union (A ∪ B):** All elements in A or B (or both)
• **Intersection (A ∩ B):** Elements in both A and B
• **Difference (A - B):** Elements in A but not in B
• **Complement (A'):** Elements not in A

**Your Mission:** Help Cantor explore the infinite world of sets!`,

      exercises: [
        {
          type: "visual-logic",
          scenario: "Cantor draws two overlapping circles representing sets A and B.",
          question: "Which shaded region represents A ∩ B (intersection)?",
          options: ["intersection", "union", "difference", "complement"],
          correct: "intersection",
          story_context:
            "Cantor explains: 'The intersection contains only elements that belong to both sets - like the overlap of two communities.'",
          feedback: {
            success:
              "Cantor nods enthusiastically. 'Precisely! The intersection captures what the sets have in common.'",
            failure:
              "Cantor sketches again. 'Remember, intersection means the elements must be in BOTH sets simultaneously.'",
          },
        },
        {
          type: "drag-drop",
          scenario: "Cantor presents two sets: A = {1, 2, 3, 4} and B = {3, 4, 5, 6}",
          question: "Find A ∪ B (the union) by dragging the correct elements:",
          items: [
            { id: "1", text: "1", category: "result" },
            { id: "2", text: "2", category: "result" },
            { id: "3", text: "3", category: "result" },
            { id: "4", text: "4", category: "result" },
            { id: "5", text: "5", category: "result" },
            { id: "6", text: "6", category: "result" },
            { id: "7", text: "7", category: "unused" },
            { id: "8", text: "0", category: "unused" },
          ],
          categories: ["result", "unused"],
          solution: ["1", "2", "3", "4", "5", "6"],
          feedback: {
            success: "Perfect! You understand that union combines all elements from both sets, without repetition.",
            failure: "Remember: union (∪) includes every element that appears in either set A or set B (or both).",
          },
        },
        {
          type: "set-builder",
          scenario:
            "Cantor challenges you to express 'the set of all even numbers between 1 and 10' in set-builder notation.",
          question: "Complete the set-builder notation: {x | _____ }",
          options: [
            "x is even and 1 < x < 10",
            "x is even and 1 ≤ x ≤ 10",
            "x is odd and 1 < x < 10",
            "x is even and x > 1",
          ],
          correct: 0,
          explanation: "We want even numbers strictly between 1 and 10, so x must be even and 1 < x < 10.",
          result_set: "{2, 4, 6, 8}",
          feedback: {
            success: "Excellent! You've mastered set-builder notation. The resulting set is {2, 4, 6, 8}.",
            failure: "Think carefully about 'between 1 and 10' - this usually means not including the endpoints.",
          },
        },
      ],
    },
  },
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number.parseInt(params.id)
  const lesson = lessons[lessonId as keyof typeof lessons]
  const [currentExercise, setCurrentExercise] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)

  if (!lesson) {
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
          <Link href="/courses" className="flex items-center gap-2 font-semibold">
            <ChevronLeft className="h-4 w-4" />
            Back to Courses
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
                <Link href={`/courses/logic/lesson/${lessonId + 1}`}>
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
                        <Link href={`/courses/logic/lesson/${lessonId + 1}`}>
                          <Button>Next Lesson</Button>
                        </Link>
                        <Link href="/courses">
                          <Button variant="outline">Back to Courses</Button>
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

// Multiple Choice Exercise Component
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

// Story Choice Exercise Component
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
          className={`flex flex-col space-y-2 rounded-md p-3 ${isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
        >
          <div className="flex items-center">
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
          <p className="text-sm italic">{isCorrect ? exercise.feedback?.success : exercise.feedback?.failure}</p>
        </div>
      )}
    </div>
  )
}
