import Link from "next/link"
import { ArrowRight, Award, BookOpen, BrainCircuit, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseCard } from "@/components/course-card"
import { DailyStreak } from "@/components/daily-streak"

export default function Home() {
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
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/courses" className="transition-colors hover:text-foreground/80">
                Courses
              </Link>
              <Link href="/practice" className="transition-colors hover:text-foreground/80">
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
              <Button variant="outline" className="ml-auto hidden md:flex">
                <Award className="mr-2 h-4 w-4 text-amber-500" />
                <span>120 XP</span>
              </Button>
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" aria-label="Settings">
                <DailyStreak streak={5} />
              </Button>
              <Button variant="ghost" size="icon" className="mr-2 rounded-full" aria-label="Profile">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  width={32}
                />
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Mathematical Logic & Proof Techniques
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Learn at your own pace with bite-sized lessons, interactive exercises, and daily practice.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/courses">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Hero Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm dark:bg-emerald-800">
                Your Progress
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Continue Your Learning Journey</h2>
              <p className="text-muted-foreground md:text-xl">
                You&apos;re making great progress! Keep up the momentum and unlock new concepts.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Current Progress</CardTitle>
                  <CardDescription>You&apos;ve completed 42% of your current course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">First Order Logic</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
                </CardContent>
                <CardFooter>
                  <Link href="/courses/logic/lesson/5">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Continue Learning</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Explore Mathematics Courses</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                From foundational logic to advanced topics, our courses will guide you through the beautiful world of
                mathematical reasoning.
              </p>
            </div>
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="popular" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <CourseCard
                    title="Mathematical Logic"
                    description="Learn the foundations of logical reasoning and proof techniques"
                    image="/placeholder.svg?height=100&width=250"
                    progress={42}
                    lessons={25}
                    level="Beginner"
                    href="/courses/logic"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Set Theory"
                    description="Explore the fundamental concepts of sets, relations, and functions"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={20}
                    level="Beginner"
                    href="/courses/set-theory"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Linear Algebra"
                    description="Master vectors, matrices, and linear transformations"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={30}
                    level="Intermediate"
                    href="/courses/linear-algebra"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Group Theory"
                    description="Understand algebraic structures and symmetry"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={22}
                    level="Advanced"
                    href="/courses/group-theory"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                </div>
              </TabsContent>
              <TabsContent value="fundamentals" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <CourseCard
                    title="Mathematical Logic"
                    description="Learn the foundations of logical reasoning and proof techniques"
                    image="/placeholder.svg?height=100&width=250"
                    progress={42}
                    lessons={25}
                    level="Beginner"
                    href="/courses/logic"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Set Theory"
                    description="Explore the fundamental concepts of sets, relations, and functions"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={20}
                    level="Beginner"
                    href="/courses/set-theory"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Number Theory"
                    description="Discover the properties of integers and prime numbers"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={18}
                    level="Beginner"
                    href="/courses/number-theory"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Proof Techniques"
                    description="Master different methods of mathematical proof"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={15}
                    level="Beginner"
                    href="/courses/proof-techniques"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <CourseCard
                    title="Real Analysis"
                    description="Explore the rigorous foundation of calculus and real numbers"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={28}
                    level="Advanced"
                    href="/courses/real-analysis"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Complex Analysis"
                    description="Study functions of complex variables and their properties"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={24}
                    level="Advanced"
                    href="/courses/complex-analysis"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Topology"
                    description="Understand spaces, continuity, and topological properties"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={26}
                    level="Advanced"
                    href="/courses/topology"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Abstract Algebra"
                    description="Explore groups, rings, fields, and algebraic structures"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={30}
                    level="Advanced"
                    href="/courses/abstract-algebra"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                </div>
              </TabsContent>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <CourseCard
                    title="Mathematical Logic"
                    description="Learn the foundations of logical reasoning and proof techniques"
                    image="/placeholder.svg?height=100&width=250"
                    progress={42}
                    lessons={25}
                    level="Beginner"
                    href="/courses/logic"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Set Theory"
                    description="Explore the fundamental concepts of sets, relations, and functions"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={20}
                    level="Beginner"
                    href="/courses/set-theory"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Linear Algebra"
                    description="Master vectors, matrices, and linear transformations"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={30}
                    level="Intermediate"
                    href="/courses/linear-algebra"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <CourseCard
                    title="Probability Theory"
                    description="Understand randomness, distributions, and statistical inference"
                    image="/placeholder.svg?height=100&width=250"
                    progress={0}
                    lessons={22}
                    level="Intermediate"
                    href="/courses/probability"
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How MathQuest Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform makes learning mathematical concepts engaging and effective.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Bite-sized Lessons</h3>
                <p className="text-muted-foreground">
                  Learn complex concepts through short, focused lessons that build on each other.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Interactive Practice</h3>
                <p className="text-muted-foreground">
                  Reinforce your understanding with interactive exercises and immediate feedback.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-muted-foreground">
                  Earn XP, maintain streaks, and watch your mathematical skills grow over time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-emerald-500" />
            <p className="text-sm text-muted-foreground">© 2025 MathQuest. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
