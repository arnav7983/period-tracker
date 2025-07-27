"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CycleTracker } from "@/components/cycle-tracker"
import { SymptomLogger } from "@/components/symptom-logger"
import { PartnerManagement } from "@/components/partner-management"
import { Analytics } from "@/components/analytics"
import { SpinWheel } from "@/components/spin-wheel"
import { HealthArticles } from "@/components/health-articles"
import { Navigation } from "@/components/navigation"
import { Calendar, Heart, BarChart3, Gamepad2, BookOpen, Users } from "lucide-react"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("cycle")

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Track your cycle and stay connected with your partner</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="cycle" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Cycle</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Symptoms</span>
            </TabsTrigger>
            <TabsTrigger value="partner" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Partner</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="wheel" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden sm:inline">Fun</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cycle">
            <CycleTracker />
          </TabsContent>

          <TabsContent value="symptoms">
            <SymptomLogger />
          </TabsContent>

          <TabsContent value="partner">
            <PartnerManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="wheel">
            <SpinWheel />
          </TabsContent>

          <TabsContent value="articles">
            <HealthArticles />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
