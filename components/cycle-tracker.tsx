"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CalendarDays, Droplets, TrendingUp } from "lucide-react"

export function CycleTracker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [flowIntensity, setFlowIntensity] = useState("")
  const [cyclePhase, setCyclePhase] = useState("menstrual")
  const { toast } = useToast()

  const handleLogPeriod = () => {
    if (!selectedDate || !flowIntensity) {
      toast({
        title: "Missing information",
        description: "Please select a date and flow intensity.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Period logged!",
      description: `Logged ${flowIntensity} flow for ${selectedDate.toDateString()}`,
    })
  }

  const nextPeriodDate = new Date()
  nextPeriodDate.setDate(nextPeriodDate.getDate() + 21)

  const ovulationDate = new Date()
  ovulationDate.setDate(ovulationDate.getDate() + 14)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Cycle Calendar
          </CardTitle>
          <CardDescription>Select dates to log your period and track your cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Log Period
            </CardTitle>
            <CardDescription>Record your flow intensity and symptoms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Flow Intensity</Label>
              <Select value={flowIntensity} onValueChange={setFlowIntensity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select flow intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                  <SelectItem value="very-heavy">Very Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cycle Phase</Label>
              <Select value={cyclePhase} onValueChange={setCyclePhase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menstrual">Menstrual</SelectItem>
                  <SelectItem value="follicular">Follicular</SelectItem>
                  <SelectItem value="ovulation">Ovulation</SelectItem>
                  <SelectItem value="luteal">Luteal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleLogPeriod} className="w-full">
              Log Period Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Next Period</p>
                <p className="text-sm text-muted-foreground">{nextPeriodDate.toDateString()}</p>
              </div>
              <Badge variant="secondary">21 days</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Ovulation</p>
                <p className="text-sm text-muted-foreground">{ovulationDate.toDateString()}</p>
              </div>
              <Badge variant="outline">14 days</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Cycle Length</p>
                <p className="text-sm text-muted-foreground">Average</p>
              </div>
              <Badge>28 days</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
