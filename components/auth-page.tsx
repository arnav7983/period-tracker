"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Heart, Mail, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDemoMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("demo-user", "true")
      toast({
        title: "Demo Mode Activated",
        description: "Exploring CycleSync with sample data. Firebase not required.",
      })
      // Reload to trigger demo mode
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  // Update the error handling in handleSignIn, handleSignUp, and handleGoogleSignIn
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFirebaseError(null)

    try {
      const { auth, isFirebaseConfigured } = await import("@/lib/firebase")

      if (!isFirebaseConfigured || !auth) {
        throw new Error("Firebase is not configured")
      }

      const { signInWithEmailAndPassword } = await import("firebase/auth")
      await signInWithEmailAndPassword(auth, email, password)

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to CycleSync.",
      })
    } catch (error: any) {
      console.error("Sign in error:", error)
      setFirebaseError("Firebase not configured. Try demo mode instead.")
      toast({
        title: "Sign in unavailable",
        description: "Firebase not configured. Use demo mode to explore the app.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFirebaseError(null)

    try {
      const { auth, isFirebaseConfigured } = await import("@/lib/firebase")

      if (!isFirebaseConfigured || !auth) {
        throw new Error("Firebase is not configured")
      }

      const { createUserWithEmailAndPassword } = await import("firebase/auth")
      await createUserWithEmailAndPassword(auth, email, password)

      toast({
        title: "Account created!",
        description: "Welcome to CycleSync. Let's start tracking together.",
      })
    } catch (error: any) {
      console.error("Sign up error:", error)
      setFirebaseError("Firebase not configured. Try demo mode instead.")
      toast({
        title: "Sign up unavailable",
        description: "Firebase not configured. Use demo mode to explore the app.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setFirebaseError(null)

    try {
      const { auth, isFirebaseConfigured } = await import("@/lib/firebase")

      if (!isFirebaseConfigured || !auth) {
        throw new Error("Firebase is not configured")
      }

      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth")
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)

      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      })
    } catch (error: any) {
      console.error("Google sign in error:", error)
      setFirebaseError("Firebase not configured. Try demo mode instead.")
      toast({
        title: "Google sign in unavailable",
        description: "Firebase not configured. Use demo mode to explore the app.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-primary">CycleSync</h1>
          </div>
          <p className="text-muted-foreground">Track your cycle together</p>
        </div>

        {firebaseError && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {firebaseError}
              {firebaseError.includes("Firebase is not configured") && (
                <Button variant="link" className="p-0 h-auto ml-2 text-primary" onClick={handleDemoMode}>
                  Continue in Demo Mode
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to your CycleSync account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-transparent"
                  disabled={loading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>

                <Button variant="secondary" onClick={handleDemoMode} className="w-full">
                  Try Demo Mode
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create account</CardTitle>
                <CardDescription>Join CycleSync and start tracking together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-transparent"
                  disabled={loading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>

                <Button variant="secondary" onClick={handleDemoMode} className="w-full">
                  Try Demo Mode
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
