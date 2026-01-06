import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlatformIcon } from "@/components/platform-icons"
import { PricingPlans } from "@/components/pricing-plans"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <span>✨</span> AI-Powered Platform
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              ContentStudio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create beautiful posts once and publish across all platforms instantly. Powered by AI for analytics,
              engagement insights, and intelligent dashboards built for modern digital agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Once</h3>
              <p className="text-muted-foreground">
                Design your content with our intuitive editor and preview on all platforms
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border hover:border-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Publish Everywhere</h3>
              <p className="text-muted-foreground">
                Distribute to multiple platforms in seconds with smart content optimization
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analytics</h3>
              <p className="text-muted-foreground">
                Get intelligent insights on engagement, performance, and content recommendations
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16 p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Supported Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Twitter", platform: "twitter" as const },
                { name: "Facebook", platform: "facebook" as const },
                { name: "Instagram", platform: "instagram" as const },
                { name: "X", platform: "x" as const },
              ].map((item) => (
                <div key={item.platform} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center hover:scale-125 transition-transform duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/40">
                    <PlatformIcon platform={item.platform} />
                  </div>
                  <span className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Content Preserved</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">4</div>
                <p className="text-sm text-muted-foreground">Platforms Supported</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">1</div>
                <p className="text-sm text-muted-foreground">Click to Publish</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <p className="text-sm text-muted-foreground">Posts Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PricingPlans />
    </div>
  )
}
