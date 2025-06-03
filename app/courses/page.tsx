import Link from "next/link"
import { BookOpen, BrainCircuit, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CourseCard } from "@/components/course-card"

export default function CoursesPage() {
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
              <Link href="/courses" className="font-bold">
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
              <h1 className="text-3xl font-bold tracking-tight">Mathematics Courses</h1>
              <p className="text-muted-foreground">Explore our comprehensive collection of mathematics courses</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Foundations</h2>
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
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Algebra</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  title="Abstract Algebra"
                  description="Explore groups, rings, fields, and algebraic structures"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={30}
                  level="Advanced"
                  href="/courses/abstract-algebra"
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
                <CourseCard
                  title="Galois Theory"
                  description="Study field extensions and their automorphism groups"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={20}
                  level="Advanced"
                  href="/courses/galois-theory"
                  icon={<BookOpen className="h-4 w-4" />}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Analysis</h2>
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
                  title="Functional Analysis"
                  description="Explore vector spaces and operators in infinite dimensions"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={22}
                  level="Advanced"
                  href="/courses/functional-analysis"
                  icon={<BookOpen className="h-4 w-4" />}
                />
                <CourseCard
                  title="Measure Theory"
                  description="Understand the foundation of modern probability and integration"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={20}
                  level="Advanced"
                  href="/courses/measure-theory"
                  icon={<BookOpen className="h-4 w-4" />}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Other Topics</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  title="Probability Theory"
                  description="Understand randomness, distributions, and statistical inference"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={22}
                  level="Intermediate"
                  href="/courses/probability"
                  icon={<BookOpen className="h-4 w-4" />}
                />
                <CourseCard
                  title="Differential Geometry"
                  description="Study curves, surfaces, and manifolds"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={24}
                  level="Advanced"
                  href="/courses/differential-geometry"
                  icon={<BookOpen className="h-4 w-4" />}
                />
                <CourseCard
                  title="Category Theory"
                  description="Explore abstract structures and their relationships"
                  image="/placeholder.svg?height=100&width=250"
                  progress={0}
                  lessons={20}
                  level="Advanced"
                  href="/courses/category-theory"
                  icon={<BookOpen className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
