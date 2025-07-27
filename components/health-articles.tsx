"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, ExternalLink, Clock, User } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle: A Complete Guide",
    description: "Learn about the four phases of your menstrual cycle and what to expect during each phase.",
    category: "General Health",
    ageGroup: "All Ages",
    readTime: "8 min read",
    author: "Dr. Sarah Johnson",
    tags: ["cycle phases", "hormones", "education"],
    featured: true,
  },
  {
    id: 2,
    title: "Managing Period Pain: Natural and Medical Solutions",
    description: "Effective strategies for dealing with menstrual cramps and discomfort.",
    category: "Pain Management",
    ageGroup: "All Ages",
    readTime: "6 min read",
    author: "Dr. Emily Chen",
    tags: ["cramps", "pain relief", "natural remedies"],
  },
  {
    id: 3,
    title: "PCOS and Irregular Periods: What You Need to Know",
    description: "Understanding polycystic ovary syndrome and its impact on menstrual health.",
    category: "Medical Conditions",
    ageGroup: "20s-30s",
    readTime: "12 min read",
    author: "Dr. Maria Rodriguez",
    tags: ["PCOS", "irregular cycles", "hormones"],
  },
  {
    id: 4,
    title: "Nutrition During Your Period: Foods That Help",
    description: "Discover which foods can help alleviate period symptoms and boost your energy.",
    category: "Nutrition",
    ageGroup: "All Ages",
    readTime: "5 min read",
    author: "Nutritionist Lisa Park",
    tags: ["nutrition", "diet", "energy"],
  },
  {
    id: 5,
    title: "Teen Periods: A Parent's Guide",
    description: "Everything parents need to know about supporting their teenager through their first periods.",
    category: "Teen Health",
    ageGroup: "Teens",
    readTime: "10 min read",
    author: "Dr. Jennifer Adams",
    tags: ["teens", "first period", "parents"],
  },
  {
    id: 6,
    title: "Emotional Wellness During Your Cycle",
    description: "Managing mood changes and emotional fluctuations throughout your menstrual cycle.",
    category: "Mental Health",
    ageGroup: "All Ages",
    readTime: "7 min read",
    author: "Dr. Rachel Green",
    tags: ["mood", "emotions", "mental health"],
  },
]

export function HealthArticles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all")

  const categories = ["all", ...Array.from(new Set(articles.map((article) => article.category)))]
  const ageGroups = ["all", ...Array.from(new Set(articles.map((article) => article.ageGroup)))]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesAgeGroup = selectedAgeGroup === "all" || article.ageGroup === selectedAgeGroup

    return matchesSearch && matchesCategory && matchesAgeGroup
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Health & Education Articles
          </CardTitle>
          <CardDescription>
            Evidence-based articles about menstrual health, wellness, and reproductive education
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                {ageGroups.map((ageGroup) => (
                  <SelectItem key={ageGroup} value={ageGroup}>
                    {ageGroup === "all" ? "All Age Groups" : ageGroup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Article */}
      {filteredArticles.some((article) => article.featured) && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <Badge className="w-fit mb-2">Featured Article</Badge>
            <CardTitle className="text-xl">{filteredArticles.find((article) => article.featured)?.title}</CardTitle>
            <CardDescription>{filteredArticles.find((article) => article.featured)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {filteredArticles.find((article) => article.featured)?.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {filteredArticles.find((article) => article.featured)?.readTime}
                </div>
              </div>
              <Button>
                Read Article
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredArticles
          .filter((article) => !article.featured)
          .map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {article.ageGroup}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Read
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
