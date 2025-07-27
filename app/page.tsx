"use client"

import { useAuth } from "@/components/auth-provider"
import { AuthPage } from "@/components/auth-page"
import { Dashboard } from "@/components/dashboard"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useEffect, useState } from "react"

export default function Home() {
  const { user, loading, error, isDemo } = useAuth()
  const [demoUser, setDemoUser] = useState(false)

  useEffect(() => {
    // Check if user is in demo mode
    if (typeof window !== "undefined") {
      const isDemoUser = localStorage.getItem("demo-user") === "true"
      setDemoUser(isDemoUser)
    }
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  // Show dashboard if user is authenticated OR in demo mode
  if (user || demoUser) {
    return <Dashboard />
  }

  return <AuthPage />
}
