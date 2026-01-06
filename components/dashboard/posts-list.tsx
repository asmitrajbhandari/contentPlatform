"use client"

import { formatDistanceToNow } from "date-fns"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

interface PostsListProps {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">Create your first post to get started with multi-platform distribution</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Created {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">⋮</button>
          </div>
        </div>
      ))}
    </div>
  )
}
