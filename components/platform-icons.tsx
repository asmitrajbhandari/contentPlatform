"use client"

export function PlatformIcon({ platform }: { platform: "twitter" | "facebook" | "instagram" | "x" }) {
  const icons = {
    twitter: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 10.5 0 10.5 0" />
      </svg>
    ),
    facebook: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
      </svg>
    ),
    instagram: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" />
        <circle cx="12" cy="12" r="4" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
    x: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  }

  const platformStyles = {
    twitter: "bg-blue-500 text-white",
    facebook: "bg-blue-600 text-white",
    instagram: "bg-pink-500 text-white",
    x: "bg-black text-white",
  }

  return (
    <div
      className={`${platformStyles[platform]} rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300`}
    >
      {icons[platform]}
    </div>
  )
}

export function PlatformIconsGrid() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-foreground">Supported Platforms</h2>
        <p className="text-center text-muted-foreground mb-12">Publish to all major social networks in one click</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-3">
            <PlatformIcon platform="twitter" />
            <span className="text-sm font-medium text-foreground">Twitter</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PlatformIcon platform="facebook" />
            <span className="text-sm font-medium text-foreground">Facebook</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PlatformIcon platform="instagram" />
            <span className="text-sm font-medium text-foreground">Instagram</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PlatformIcon platform="x" />
            <span className="text-sm font-medium text-foreground">X</span>
          </div>
        </div>
      </div>
    </div>
  )
}
