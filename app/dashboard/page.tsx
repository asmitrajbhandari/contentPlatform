"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import PostsList from "@/components/dashboard/posts-list"
import PlatformConnections from "@/components/dashboard/platform-connections"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }
        setUser(user)

        // Load posts
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (postsError) throw postsError
        setPosts(postsData || [])
      } catch (error) {
        console.error("Error loading dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <DashboardHeader user={user} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Posts</h2>
              <Link href="/dashboard/create">
                <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90">
                  + Create Post
                </Button>
              </Link>
            </div>

            <PostsList posts={posts} />
          </div>

          {/* Sidebar */}
          <div>
            <PlatformConnections userId={user?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
