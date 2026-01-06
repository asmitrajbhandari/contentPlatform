"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PostEditor from "@/components/dashboard/post-editor"
import PlatformSelector from "@/components/dashboard/platform-selector"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Create post
      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          title,
          content,
        })
        .select()
        .single()

      if (postError) throw postError

      // Create distribution records for selected platforms
      if (selectedPlatforms.length > 0) {
        const distributions = selectedPlatforms.map((platform) => ({
          post_id: post.id,
          platform_name: platform,
          status: "pending",
        }))

        const { error: distError } = await supabase.from("post_distributions").insert(distributions)

        if (distError) throw distError
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">Create New Post</h1>
        </div>

        <form onSubmit={handleCreatePost} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <PostEditor title={title} setTitle={setTitle} content={content} setContent={setContent} />

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !title || !content}
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90"
            >
              {loading ? "Publishing..." : "Publish to Selected Platforms"}
            </Button>
          </div>

          {/* Platform Selector */}
          <div>
            <PlatformSelector selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} />
          </div>
        </form>
      </div>
    </div>
  )
}
