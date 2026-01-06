"use client"

interface PlatformSelectorProps {
  selectedPlatforms: string[]
  setSelectedPlatforms: (platforms: string[]) => void
}

const PLATFORMS = [
  { id: "twitter", name: "Twitter", icon: "𝕏", color: "from-blue-500 to-cyan-500" },
  { id: "facebook", name: "Facebook", icon: "f", color: "from-blue-600 to-blue-400" },
  { id: "instagram", name: "Instagram", icon: "📷", color: "from-pink-500 to-purple-500" },
  { id: "x", name: "X (Formerly Twitter)", icon: "✕", color: "from-slate-900 to-slate-700" },
]

export default function PlatformSelector({ selectedPlatforms, setSelectedPlatforms }: PlatformSelectorProps) {
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
      <h3 className="font-semibold mb-4">Publish to Platforms</h3>
      <div className="space-y-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedPlatforms.includes(platform.id)
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="font-medium">{platform.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {selectedPlatforms.includes(platform.id) ? "✓ Selected" : "Not selected"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
        <p className="text-xs text-muted-foreground">
          <strong>Selected:</strong> {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}
