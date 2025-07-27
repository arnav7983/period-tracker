"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Calendar, Heart, AlertTriangle } from "lucide-react"

export function Analytics() {
  const cycleData = {
    averageLength: 28,
    lastCycleLength: 26,
    regularity: 85,
    nextPeriod: "March 15, 2024",
  }

  const symptomTrends = [
    { name: "Cramps", frequency: 75, trend: "stable" },
    { name: "Mood swings", frequency: 60, trend: "decreasing" },
    { name: "Fatigue", frequency: 45, trend: "increasing" },
    { name: "Headaches", frequency: 30, trend: "stable" },
  ]

  const moodData = [
    { mood: "Happy", percentage: 40, color: "bg-green-500" },
    { mood: "Neutral", percentage: 35, color: "bg-gray-500" },
    { mood: "Irritable", percentage: 15, color: "bg-red-500" },
    { mood: "Sad", percentage: 10, color: "bg-blue-500" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Cycle Overview
          </CardTitle>
          <CardDescription>Your cycle patterns over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-primary">{cycleData.averageLength}</div>
              <div className="text-sm text-muted-foreground">Avg Cycle Length</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-primary">{cycleData.lastCycleLength}</div>
              <div className="text-sm text-muted-foreground">Last Cycle</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cycle Regularity</span>
              <span className="text-sm text-muted-foreground">{cycleData.regularity}%</span>
            </div>
            <Progress value={cycleData.regularity} className="h-2" />
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Next Period Prediction</span>
            </div>
            <p className="text-sm">{cycleData.nextPeriod}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Symptom Trends
          </CardTitle>
          <CardDescription>Track how your symptoms change over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {symptomTrends.map((symptom) => (
            <div key={symptom.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{symptom.name}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      symptom.trend === "increasing"
                        ? "destructive"
                        : symptom.trend === "decreasing"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {symptom.trend}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{symptom.frequency}%</span>
                </div>
              </div>
              <Progress value={symptom.frequency} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Mood Distribution
          </CardTitle>
          <CardDescription>Your emotional patterns throughout your cycle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {moodData.map((mood) => (
            <div key={mood.mood} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{mood.mood}</span>
                <span className="text-sm text-muted-foreground">{mood.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${mood.color}`} style={{ width: `${mood.percentage}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Health Insights
          </CardTitle>
          <CardDescription>Important patterns and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">Cycle Irregularity</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Your last cycle was 2 days shorter than average. Consider tracking stress levels.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">Positive Trend</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your mood swings have decreased by 20% this month. Great progress!
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800 dark:text-blue-200">Recommendation</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Consider adding iron-rich foods to your diet during your period.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
