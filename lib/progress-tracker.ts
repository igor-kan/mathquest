export interface UserProgress {
  userId: string
  courseId: string
  lessonId: number
  completedExercises: number
  totalExercises: number
  completionPercentage: number
  xpEarned: number
  timeSpent: number // in minutes
  lastAccessed: Date
  streak: number
  achievements: string[]
  weakAreas: string[]
  strengths: string[]
}

export interface LearningAnalytics {
  averageTimePerExercise: number
  accuracyRate: number
  preferredLearningTime: string
  mostDifficultTopics: string[]
  improvementSuggestions: string[]
  nextRecommendedCourse: string
}

export class ProgressTracker {
  private static instance: ProgressTracker
  private userProgress: Map<string, UserProgress[]> = new Map()
  private analytics: Map<string, LearningAnalytics> = new Map()

  private constructor() {}

  public static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker()
    }
    return ProgressTracker.instance
  }

  public updateProgress(userId: string, courseId: string, lessonId: number, exerciseCompleted: boolean, timeSpent: number): void {
    const userProgressArray = this.userProgress.get(userId) || []
    let courseProgress = userProgressArray.find(p => p.courseId === courseId)

    if (!courseProgress) {
      courseProgress = {
        userId,
        courseId,
        lessonId,
        completedExercises: 0,
        totalExercises: this.getTotalExercises(courseId),
        completionPercentage: 0,
        xpEarned: 0,
        timeSpent: 0,
        lastAccessed: new Date(),
        streak: 0,
        achievements: [],
        weakAreas: [],
        strengths: []
      }
      userProgressArray.push(courseProgress)
    }

    // Update progress
    if (exerciseCompleted) {
      courseProgress.completedExercises++
      courseProgress.xpEarned += 10 // Base XP per exercise
      
      // Bonus XP for streaks
      if (this.isConsecutiveDay(userId)) {
        courseProgress.streak++
        courseProgress.xpEarned += courseProgress.streak * 2
      } else {
        courseProgress.streak = 1
      }
    }

    courseProgress.timeSpent += timeSpent
    courseProgress.lastAccessed = new Date()
    courseProgress.completionPercentage = (courseProgress.completedExercises / courseProgress.totalExercises) * 100

    // Update achievements
    this.updateAchievements(courseProgress)

    this.userProgress.set(userId, userProgressArray)
    this.updateAnalytics(userId, courseProgress)
  }

  private updateAchievements(progress: UserProgress): void {
    const achievements = []

    // Streak achievements
    if (progress.streak >= 7) achievements.push("week_warrior")
    if (progress.streak >= 30) achievements.push("month_master")
    if (progress.streak >= 100) achievements.push("century_scholar")

    // XP achievements
    if (progress.xpEarned >= 1000) achievements.push("thousand_points")
    if (progress.xpEarned >= 5000) achievements.push("five_k_champion")
    if (progress.xpEarned >= 10000) achievements.push("ten_k_legend")

    // Completion achievements
    if (progress.completionPercentage >= 50) achievements.push("halfway_hero")
    if (progress.completionPercentage >= 100) achievements.push("course_conqueror")

    // Time-based achievements
    if (progress.timeSpent >= 600) achievements.push("dedicated_learner") // 10 hours
    if (progress.timeSpent >= 1800) achievements.push("time_master") // 30 hours

    progress.achievements = [...new Set([...progress.achievements, ...achievements])]
  }

  private updateAnalytics(userId: string, progress: UserProgress): void {
    const analytics: LearningAnalytics = {
      averageTimePerExercise: progress.timeSpent / progress.completedExercises || 0,
      accuracyRate: this.calculateAccuracyRate(userId, progress.courseId),
      preferredLearningTime: this.getPreferredLearningTime(userId),
      mostDifficultTopics: this.getMostDifficultTopics(userId),
      improvementSuggestions: this.generateImprovementSuggestions(progress),
      nextRecommendedCourse: this.getNextRecommendedCourse(progress)
    }

    this.analytics.set(userId, analytics)
  }

  private calculateAccuracyRate(userId: string, courseId: string): number {
    // Implement accuracy calculation based on exercise results
    return 85 // Placeholder
  }

  private getPreferredLearningTime(userId: string): string {
    // Analyze learning patterns to determine optimal learning times
    return "morning" // Placeholder
  }

  private getMostDifficultTopics(userId: string): string[] {
    // Analyze performance to identify challenging topics
    return ["proof_techniques", "complex_analysis"] // Placeholder
  }

  private generateImprovementSuggestions(progress: UserProgress): string[] {
    const suggestions = []

    if (progress.completionPercentage < 50) {
      suggestions.push("Try to complete at least one lesson per day")
    }

    if (progress.streak < 7) {
      suggestions.push("Build a daily learning habit for better retention")
    }

    if (progress.timeSpent / progress.completedExercises > 30) {
      suggestions.push("Focus on fundamental concepts to improve speed")
    }

    return suggestions
  }

  private getNextRecommendedCourse(progress: UserProgress): string {
    const completionThreshold = 80

    if (progress.completionPercentage >= completionThreshold) {
      // Recommend next course based on current course
      const recommendations: { [key: string]: string } = {
        "logic": "set-theory",
        "set-theory": "linear-algebra",
        "linear-algebra": "real-analysis",
        "proof-techniques": "abstract-algebra"
      }

      return recommendations[progress.courseId] || "advanced-topics"
    }

    return progress.courseId // Continue current course
  }

  private getTotalExercises(courseId: string): number {
    // This would typically fetch from course data
    const exerciseCounts: { [key: string]: number } = {
      "logic": 120,
      "set-theory": 90,
      "linear-algebra": 150,
      "real-analysis": 180,
      "abstract-algebra": 200
    }

    return exerciseCounts[courseId] || 100
  }

  private isConsecutiveDay(userId: string): boolean {
    const userProgressArray = this.userProgress.get(userId) || []
    if (userProgressArray.length === 0) return false

    const lastAccess = Math.max(...userProgressArray.map(p => p.lastAccessed.getTime()))
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    return lastAccess >= yesterday.getTime()
  }

  public getUserProgress(userId: string): UserProgress[] {
    return this.userProgress.get(userId) || []
  }

  public getUserAnalytics(userId: string): LearningAnalytics | null {
    return this.analytics.get(userId) || null
  }

  public getLeaderboard(): Array<{ userId: string; totalXP: number; streak: number }> {
    const leaderboard: Array<{ userId: string; totalXP: number; streak: number }> = []

    this.userProgress.forEach((progressArray, userId) => {
      const totalXP = progressArray.reduce((sum, p) => sum + p.xpEarned, 0)
      const maxStreak = Math.max(...progressArray.map(p => p.streak))
      
      leaderboard.push({ userId, totalXP, streak: maxStreak })
    })

    return leaderboard.sort((a, b) => b.totalXP - a.totalXP)
  }

  public exportProgressData(userId: string): string {
    const progress = this.getUserProgress(userId)
    const analytics = this.getUserAnalytics(userId)
    
    return JSON.stringify({
      progress,
      analytics,
      exportDate: new Date().toISOString()
    }, null, 2)
  }
}

// Achievement definitions
export const ACHIEVEMENTS = {
  week_warrior: {
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    xpBonus: 50
  },
  month_master: {
    name: "Month Master",
    description: "Maintain a 30-day learning streak",
    icon: "🏆",
    xpBonus: 200
  },
  century_scholar: {
    name: "Century Scholar",
    description: "Maintain a 100-day learning streak",
    icon: "🌟",
    xpBonus: 1000
  },
  thousand_points: {
    name: "Thousand Points",
    description: "Earn 1,000 XP",
    icon: "💎",
    xpBonus: 100
  },
  five_k_champion: {
    name: "5K Champion",
    description: "Earn 5,000 XP",
    icon: "🏅",
    xpBonus: 500
  },
  ten_k_legend: {
    name: "10K Legend",
    description: "Earn 10,000 XP",
    icon: "👑",
    xpBonus: 1000
  },
  halfway_hero: {
    name: "Halfway Hero",
    description: "Complete 50% of a course",
    icon: "🎯",
    xpBonus: 25
  },
  course_conqueror: {
    name: "Course Conqueror",
    description: "Complete an entire course",
    icon: "🏰",
    xpBonus: 100
  },
  dedicated_learner: {
    name: "Dedicated Learner",
    description: "Study for 10 hours total",
    icon: "📚",
    xpBonus: 75
  },
  time_master: {
    name: "Time Master",
    description: "Study for 30 hours total",
    icon: "⏰",
    xpBonus: 200
  }
} as const

export type AchievementKey = keyof typeof ACHIEVEMENTS