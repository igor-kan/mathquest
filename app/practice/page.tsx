import Link from "next/link"
import { BrainCircuit, CheckCircle, Clock, Dumbbell, Flame, Sparkles, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PracticePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-emerald-500" />
              <span className="hidden font-bold sm:inline-block">MathQuest</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/courses" className="transition-colors hover:text-foreground/80">
                Courses
              </Link>
              <Link href="/practice" className="font-bold">
                Practice
              </Link>
              <Link href="/community" className="transition-colors hover:text-foreground/80">
                Community
              </Link>
              <Link href="/resources" className="transition-colors hover:text-foreground/80">
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="ghost" size="icon" className="ml-auto hidden md:flex">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  width={32}
                />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
              <p className="text-muted-foreground">
                Strengthen your mathematical skills with targeted practice exercises
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-400">
                <Flame className="h-4 w-4 text-amber-500" />
                <span>5 day streak</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-400">
                <Trophy className="h-4 w-4 text-emerald-500" />
                <span>120 XP</span>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="daily">Daily Practice</TabsTrigger>
              <TabsTrigger value="topics">By Topic</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="relative overflow-hidden">
                  <div className="absolute right-2 top-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-400">
                    Today
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>Daily Challenge</CardTitle>
                    <CardDescription>5 minutes of focused practice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                        <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Mixed Topics</h3>
                        <p className="text-sm text-muted-foreground">5 questions from your active courses</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Practice</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Quick Review</CardTitle>
                    <CardDescription>Reinforce recent concepts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">First-Order Logic</h3>
                        <p className="text-sm text-muted-foreground">Review quantifiers and predicates</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start Review
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Weak Points</CardTitle>
                    <CardDescription>Focus on areas needing improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                        <Dumbbell className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Proof Techniques</h3>
                        <p className="text-sm text-muted-foreground">Practice proof by contradiction</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start Practice
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-semibold">Weekly Progress</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-7">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={day} className="flex flex-col items-center">
                          <div className="text-sm font-medium">{day}</div>
                          <div
                            className={`mt-2 flex h-16 w-16 flex-col items-center justify-center rounded-full ${
                              i < 5
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {i < 5 ? (
                              <>
                                <CheckCircle className="h-6 w-6" />
                                <span className="mt-1 text-xs font-medium">{[25, 30, 15, 20, 30][i]} XP</span>
                              </>
                            ) : (
                              <span className="text-xs">-</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="topics" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Mathematical Logic</CardTitle>
                    <CardDescription>Practice logical reasoning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Practice Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Set Theory</CardTitle>
                    <CardDescription>Practice set operations and proofs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Practice Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Proof Techniques</CardTitle>
                    <CardDescription>Practice various proof methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Practice Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Linear Algebra</CardTitle>
                    <CardDescription>Practice vector spaces and transformations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled>
                      Start Course First
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Real Analysis</CardTitle>
                    <CardDescription>Practice limits, continuity, and differentiation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled>
                      Start Course First
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Group Theory</CardTitle>
                    <CardDescription>Practice group properties and homomorphisms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mastery</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled>
                      Start Course First
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="challenges" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Weekly Challenge</CardTitle>
                      <div className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-400">
                        3 days left
                      </div>
                    </div>
                    <CardDescription>Test your skills with advanced problems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                        <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Logical Paradoxes</h3>
                        <p className="text-sm text-muted-foreground">Solve 5 challenging logical puzzles</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Accept Challenge</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Community Challenge</CardTitle>
                      <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800/30 dark:text-blue-400">
                        New
                      </div>
                    </div>
                    <CardDescription>Compete with other learners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Set Theory Tournament</h3>
                        <p className="text-sm text-muted-foreground">Compete in a 10-question challenge</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Tournament</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Monthly Master</CardTitle>
                      <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-800/30 dark:text-purple-400">
                        10 days left
                      </div>
                    </div>
                    <CardDescription>Prove your mastery across topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                        <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Mathematical Foundations</h3>
                        <p className="text-sm text-muted-foreground">20 questions across multiple topics</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Challenge</Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-semibold">Past Challenges</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <Trophy className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">Proof Techniques Challenge</h3>
                            <p className="text-sm text-muted-foreground">Completed 2 weeks ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">85%</div>
                          <div className="text-sm text-muted-foreground">Score</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <Trophy className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">Logic Puzzles</h3>
                            <p className="text-sm text-muted-foreground">Completed 1 month ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">70%</div>
                          <div className="text-sm text-muted-foreground">Score</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <Trophy className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">Set Theory Basics</h3>
                            <p className="text-sm text-muted-foreground">Completed 2 months ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">90%</div>
                          <div className="text-sm text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
