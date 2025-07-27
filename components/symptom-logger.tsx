"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Heart, Smile, Frown, Meh, Angry, Zap } from "lucide-react"

const symptoms = [
  "Cramps",
  "Bloating",
  "Headache",
  "Fatigue",
  "Nausea",
  "Breast tenderness",
  "Back pain",
  "Cravings",
  "Acne",
  "Mood swings",
]

const moods = [
  { name: "Happy", icon: Smile, color: "text-green-500" },
  { name: "Sad", icon: Frown, color: "text-blue-500" },
  { name: "Neutral", icon: Meh, color: "text-gray-500" },
  { name: "Irritable", icon: Angry, color: "text-red-500" },
  { name: "Anxious", icon: Zap, color: "text-yellow-500" },
]

export function SymptomLogger() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState("")
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    }
  }

  const handleSaveLog = () => {
    toast({
      title: "Symptoms logged!",
      description: `Saved ${selectedSymptoms.length} symptoms and mood: ${selectedMood}`,
    })

    // Reset form
    setSelectedSymptoms([])
    setSelectedMood("")
    setNotes("")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Daily Symptoms
          </CardTitle>
          <CardDescription>Track your physical symptoms throughout your cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-2">
                <Checkbox
                  id={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                />
                <Label htmlFor={symptom} className="text-sm">
                  {symptom}
                </Label>
              </div>
            ))}
          </div>

          {selectedSymptoms.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Selected symptoms:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSymptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Tracking</CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => {
                const Icon = mood.icon
                return (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? "default" : "outline"}
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => setSelectedMood(mood.name)}
                  >
                    <Icon className={`h-6 w-6 ${mood.color}`} />
                    <span className="text-xs">{mood.name}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Notes</CardTitle>
            <CardDescription>Add any additional notes about your day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="How are you feeling? Any additional symptoms or observations?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />

            <Button onClick={handleSaveLog} className="w-full">
              Save Today's Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
