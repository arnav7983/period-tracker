"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Users, Mail, Bell, Heart, Copy, UserPlus } from "lucide-react"

export function PartnerManagement() {
  const [partnerEmail, setPartnerEmail] = useState("")
  const [inviteCode] = useState("CYCLE-2024-ABC123")
  const [isLinked, setIsLinked] = useState(false)
  const [notifications, setNotifications] = useState({
    periodStart: true,
    ovulation: false,
    moodChanges: true,
    reminders: true,
  })
  const { toast } = useToast()

  const handleInvitePartner = () => {
    if (!partnerEmail) {
      toast({
        title: "Email required",
        description: "Please enter your partner's email address.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Invitation sent!",
      description: `Invitation sent to ${partnerEmail}`,
    })
    setPartnerEmail("")
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode)
    toast({
      title: "Code copied!",
      description: "Share this code with your partner",
    })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Settings updated",
      description: `${key} notifications ${value ? "enabled" : "disabled"}`,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Invite Partner
            </CardTitle>
            <CardDescription>Connect with your partner to track together</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner-email">Partner's Email</Label>
              <Input
                id="partner-email"
                type="email"
                placeholder="partner@example.com"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleInvitePartner} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or share code</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input value={inviteCode} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Partner Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLinked ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-muted-foreground">alex@example.com</p>
                    </div>
                  </div>
                  <Badge>Connected</Badge>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Partner's Calendar
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No partner connected yet</p>
                <p className="text-sm text-muted-foreground mt-1">Send an invitation to start tracking together</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Partner Notifications
          </CardTitle>
          <CardDescription>Choose what notifications your partner receives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Period Start</Label>
              <p className="text-sm text-muted-foreground">Notify when your period begins</p>
            </div>
            <Switch
              checked={notifications.periodStart}
              onCheckedChange={(checked) => handleNotificationChange("periodStart", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ovulation Window</Label>
              <p className="text-sm text-muted-foreground">Notify during fertile window</p>
            </div>
            <Switch
              checked={notifications.ovulation}
              onCheckedChange={(checked) => handleNotificationChange("ovulation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mood Changes</Label>
              <p className="text-sm text-muted-foreground">Share mood updates</p>
            </div>
            <Switch
              checked={notifications.moodChanges}
              onCheckedChange={(checked) => handleNotificationChange("moodChanges", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Care Reminders</Label>
              <p className="text-sm text-muted-foreground">Gentle reminders to check in</p>
            </div>
            <Switch
              checked={notifications.reminders}
              onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
