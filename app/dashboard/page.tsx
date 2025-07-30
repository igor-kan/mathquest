import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Calendar, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // In a real app, this would come from authentication
  const userId = "user123"
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your progress, analyze your learning patterns, and achieve your goals
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-emerald-600">
              <BrainCircuit className="h-3 w-3 mr-1" />
              Active Learner
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              Today's Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">Complete 3 exercises</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2/3 done</span>
              <Badge variant="secondary">67%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Target className="h-4 w-4 mr-2 text-orange-500" />
              Weekly Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">Study 5 hours</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">3.2h done</span>
              <Badge variant="secondary">64%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Monthly XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">Earn 2000 XP</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">1420 XP</span>
              <Badge variant="secondary">71%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/practice">
              <Button size="sm" className="w-full text-xs">
                Practice Now
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="sm" variant="outline" className="w-full text-xs">
                Browse Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <AnalyticsDashboard userId={userId} />

      {/* Study Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">💡 Study Tips</CardTitle>
          <CardDescription>Personalized recommendations based on your learning patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                🧠 Active Learning
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Try explaining concepts out loud or teaching them to someone else. This reinforces your understanding.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                ⏰ Spaced Repetition
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                Review difficult concepts at increasing intervals. This helps move information to long-term memory.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                🎯 Goal Setting
              </h4>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Set specific, measurable goals for each study session. This keeps you focused and motivated.
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                🔄 Regular Breaks
              </h4>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Take a 5-10 minute break every 25-30 minutes of study. This prevents mental fatigue.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}