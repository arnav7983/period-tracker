"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { isFirebaseConfigured } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isDemo: false,
})

export const useAuth = () => useContext(AuthContext)

// Demo user for when Firebase is not configured
const demoUser = {
  uid: "demo-user",
  email: "demo@cyclesync.com",
  displayName: "Demo User",
} as User

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const initializeAuth = async () => {
      if (!isFirebaseConfigured) {
        // Firebase not configured, use demo mode
        setIsDemo(true)
        setLoading(false)
        return
      }

      try {
        const { auth } = await import("@/lib/firebase")

        if (!auth) {
          throw new Error("Firebase Auth not initialized")
        }

        const { onAuthStateChanged } = await import("firebase/auth")

        unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            setUser(user)
            setLoading(false)
            setError(null)
          },
          (error) => {
            console.error("Auth state change error:", error)
            setError("Authentication error occurred")
            setLoading(false)
          },
        )
      } catch (error) {
        console.error("Firebase initialization error:", error)
        setError("Firebase not configured properly")
        setIsDemo(true)
        setLoading(false)
      }
    }

    initializeAuth()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // Handle demo mode login
  const loginDemo = () => {
    setUser(demoUser)
    setIsDemo(true)
  }

  // Handle demo mode logout
  const logoutDemo = () => {
    setUser(null)
    setIsDemo(false)
  }

  return <AuthContext.Provider value={{ user, loading, error, isDemo }}>{children}</AuthContext.Provider>
}

// Export demo functions for use in components
export const useDemoAuth = () => {
  const { isDemo } = useAuth()

  const loginDemo = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("demo-user", "true")
      window.location.reload()
    }
  }

  const logoutDemo = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo-user")
      window.location.reload()
    }
  }

  return { isDemo, loginDemo, logoutDemo }
}
