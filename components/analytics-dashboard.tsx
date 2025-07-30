"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  Calendar,
  BookOpen,
  Brain,
  Download,
  Share2
} from "lucide-react"
import { ProgressTracker, UserProgress, LearningAnalytics, ACHIEVEMENTS } from "@/lib/progress-tracker"

interface AnalyticsDashboardProps {
  userId: string
}

export function AnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null)
  const [leaderboard, setLeaderboard] = useState<Array<{ userId: string; totalXP: number; streak: number }>>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "all">("week")

  useEffect(() => {
    const progressTracker = ProgressTracker.getInstance()
    setUserProgress(progressTracker.getUserProgress(userId))
    setAnalytics(progressTracker.getUserAnalytics(userId))
    setLeaderboard(progressTracker.getLeaderboard())
  }, [userId])

  const totalXP = userProgress.reduce((sum, p) => sum + p.xpEarned, 0)
  const maxStreak = Math.max(...userProgress.map(p => p.streak), 0)
  const totalTimeSpent = userProgress.reduce((sum, p) => sum + p.timeSpent, 0)
  const averageCompletion = userProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / userProgress.length || 0

  const allAchievements = userProgress.flatMap(p => p.achievements)
  const uniqueAchievements = [...new Set(allAchievements)]

  const handleExportData = () => {
    const progressTracker = ProgressTracker.getInstance()
    const data = progressTracker.exportProgressData(userId)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mathquest-progress-${userId}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStreakColor = (streak: number): string => {
    if (streak >= 30) return "text-purple-600"
    if (streak >= 14) return "text-orange-600"
    if (streak >= 7) return "text-blue-600"
    return "text-gray-600"
  }

  const getXPLevel = (xp: number): { level: number; nextLevelXP: number; progress: number } => {
    const level = Math.floor(xp / 1000) + 1
    const nextLevelXP = level * 1000
    const progress = ((xp % 1000) / 1000) * 100
    return { level, nextLevelXP, progress }
  }

  const { level, nextLevelXP, progress } = getXPLevel(totalXP)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Level {level} • {Math.round(progress)}% to next level
            </div>
            <Progress value={progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStreakColor(maxStreak)}`}>
              {maxStreak} days
            </div>
            <div className="text-xs text-muted-foreground">
              {maxStreak >= 7 ? "🔥 On fire!" : "Keep going!"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalTimeSpent / 60)}h</div>
            <div className="text-xs text-muted-foreground">
              {Math.round(totalTimeSpent % 60)}m total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageCompletion)}%</div>
            <div className="text-xs text-muted-foreground">
              Across all courses
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProgress.map((progress) => (
                  <div key={progress.courseId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="font-medium capitalize">
                          {progress.courseId.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {progress.completedExercises}/{progress.totalExercises}
                        </span>
                        <Badge variant="secondary">{Math.round(progress.completionPercentage)}%</Badge>
                      </div>
                    </div>
                    <Progress value={progress.completionPercentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{progress.xpEarned} XP earned</span>
                      <span>{Math.round(progress.timeSpent / 60)}h {Math.round(progress.timeSpent % 60)}m spent</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>
                {uniqueAchievements.length} of {Object.keys(ACHIEVEMENTS).length} achievements unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => {
                  const isUnlocked = uniqueAchievements.includes(key)
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border ${
                        isUnlocked 
                          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" 
                          : "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <div className={`font-medium ${isUnlocked ? "text-emerald-700 dark:text-emerald-300" : "text-gray-500"}`}>
                            {achievement.name}
                          </div>
                          {isUnlocked && (
                            <Badge variant="secondary" className="text-xs">
                              +{achievement.xpBonus} XP
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${isUnlocked ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {analytics && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Insights</CardTitle>
                  <CardDescription>Personalized analytics based on your study patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average time per exercise</span>
                    <Badge variant="outline">{Math.round(analytics.averageTimePerExercise)}min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy rate</span>
                    <Badge variant="outline">{analytics.accuracyRate}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Preferred learning time</span>
                    <Badge variant="outline" className="capitalize">{analytics.preferredLearningTime}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                  <CardDescription>AI-powered recommendations for better learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.improvementSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Brain className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                  {analytics.nextRecommendedCourse && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Next Recommended Course
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 capitalize">
                        {analytics.nextRecommendedCourse.replace('-', ' ')}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>See how you rank against other learners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div key={entry.userId} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-yellow-100 text-yellow-800" :
                        index === 1 ? "bg-gray-100 text-gray-800" :
                        index === 2 ? "bg-orange-100 text-orange-800" :
                        "bg-gray-50 text-gray-600"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.userId === userId ? "You" : `User ${entry.userId.slice(-4)}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{entry.totalXP.toLocaleString()} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Actions */}
      <div className="flex gap-2">
        <Button onClick={handleExportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share Progress
        </Button>
      </div>
    </div>
  )
}