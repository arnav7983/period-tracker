"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Gamepad2, Heart, Coffee, Music, Sparkles } from "lucide-react"

const wheelOptions = [
  {
    category: "Date Ideas",
    items: [
      "Movie night at home",
      "Picnic in the park",
      "Cooking together",
      "Art gallery visit",
      "Beach walk",
      "Board game night",
    ],
  },
  {
    category: "Comfort Items",
    items: ["Heating pad", "Favorite tea", "Cozy blanket", "Bath bombs", "Chocolate", "Essential oils"],
  },
  {
    category: "Relaxation Tips",
    items: ["Deep breathing", "Gentle yoga", "Meditation", "Warm bath", "Journaling", "Nature sounds"],
  },
  {
    category: "Partner Tasks",
    items: ["Give a massage", "Make favorite meal", "Run errands", "Plan surprise", "Listen actively", "Bring flowers"],
  },
]

export function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<{ category: string; item: string } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Date Ideas")
  const { toast } = useToast()

  const spinWheel = () => {
    setIsSpinning(true)
    setResult(null)

    // Simulate spinning animation
    setTimeout(() => {
      const categoryData = wheelOptions.find((opt) => opt.category === selectedCategory)
      if (categoryData) {
        const randomItem = categoryData.items[Math.floor(Math.random() * categoryData.items.length)]
        setResult({ category: selectedCategory, item: randomItem })
      }
      setIsSpinning(false)

      toast({
        title: "Wheel spun!",
        description: "Here's your suggestion for today",
      })
    }, 3000)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Date Ideas":
        return Heart
      case "Comfort Items":
        return Coffee
      case "Relaxation Tips":
        return Sparkles
      case "Partner Tasks":
        return Music
      default:
        return Gamepad2
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Gamepad2 className="h-6 w-6 text-primary" />
            Spin the Wheel
          </CardTitle>
          <CardDescription>
            Get fun suggestions for dates, comfort items, relaxation tips, and partner bonding activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {wheelOptions.map((option) => {
              const Icon = getCategoryIcon(option.category)
              return (
                <Button
                  key={option.category}
                  variant={selectedCategory === option.category ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setSelectedCategory(option.category)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs text-center">{option.category}</span>
                </Button>
              )
            })}
          </div>

          {/* Wheel Animation */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className={`w-48 h-48 rounded-full border-8 border-primary bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${
                  isSpinning ? "spin-animation" : ""
                }`}
              >
                <div className="text-center">
                  <Gamepad2 className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-primary">{selectedCategory}</p>
                </div>
              </div>

              {/* Wheel pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
              </div>
            </div>

            <Button onClick={spinWheel} disabled={isSpinning} size="lg" className="px-8">
              {isSpinning ? "Spinning..." : "Spin the Wheel!"}
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <Badge variant="secondary" className="text-sm">
                    {result.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-primary">{result.item}</h3>
                  <p className="text-muted-foreground">
                    Perfect for today! Give it a try and see how it makes you feel.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedCategory} Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {wheelOptions
                  .find((opt) => opt.category === selectedCategory)
                  ?.items.map((item, index) => (
                    <Badge key={index} variant="outline" className="justify-center py-2">
                      {item}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
