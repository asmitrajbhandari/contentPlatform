"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface PlatformConnectionsProps {
  userId: string | undefined
}

const PLATFORMS = [
  { id: "twitter", name: "Twitter", icon: "𝕏" },
  { id: "facebook", name: "Facebook", icon: "f" },
  { id: "instagram", name: "Instagram", icon: "📷" },
  { id: "x", name: "X", icon: "✕" },
]

export default function PlatformConnections({ userId }: PlatformConnectionsProps) {
  const [connections, setConnections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    const loadConnections = async () => {
      try {
        const { data, error } = await supabase.from("platform_connections").select("*").eq("user_id", userId)

        if (error) throw error
        setConnections(data || [])
      } catch (error) {
        console.error("Error loading connections:", error)
      } finally {
        setLoading(false)
      }
    }

    loadConnections()
  }, [userId])

  const isConnected = (platformId: string) => {
    return connections.some((c) => c.platform_name === platformId && c.is_connected)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-semibold mb-4">Platform Connections</h3>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-sm">
                  {platform.icon}
                </div>
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              {isConnected(platform.id) ? (
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Connected</span>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
        Platform connections will be available soon. You can select platforms when creating posts.
      </p>
    </div>
  )
}
