"use client"

import { Input } from "@/components/ui/input"

interface PostEditorProps {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
}

export default function PostEditor({ title, setTitle, content, setContent }: PostEditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <label className="block text-sm font-medium mb-3">Post Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a compelling title..."
          className="text-lg"
          maxLength={100}
        />
        <p className="text-xs text-muted-foreground mt-2">{title.length}/100 characters</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <label className="block text-sm font-medium mb-3">Post Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here. It will be optimized for each platform..."
          className="w-full h-64 p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          maxLength={5000}
        />
        <p className="text-xs text-muted-foreground mt-2">{content.length}/5000 characters</p>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <p className="text-sm text-accent-foreground">
          <strong>💡 Tip:</strong> Your content will be automatically optimized for each platform's character limits and
          formatting requirements.
        </p>
      </div>
    </div>
  )
}
