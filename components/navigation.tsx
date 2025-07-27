"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Heart, LogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export function Navigation() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      // Check if in demo mode
      if (typeof window !== "undefined" && localStorage.getItem("demo-user") === "true") {
        localStorage.removeItem("demo-user")
        window.location.reload()
        return
      }

      const { auth, isFirebaseConfigured } = await import("@/lib/firebase")

      if (isFirebaseConfigured && auth) {
        const { signOut } = await import("firebase/auth")
        await signOut(auth)
      }

      toast({
        title: "Signed out",
        description: "See you next time!",
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Signed out",
        description: "Session ended.",
      })
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">CycleSync</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <div className="hidden sm:block text-sm text-muted-foreground">
            {user?.email ||
              (typeof window !== "undefined" && localStorage.getItem("demo-user") === "true" ? "Demo User" : "Guest")}
          </div>

          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
