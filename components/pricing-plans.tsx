import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingPlans() {
  const plans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Perfect for trying out ContentStudio",
      features: [
        "Up to 5 posts per month",
        "Single platform publishing",
        "Basic content editor",
        "Community support",
        "Standard analytics",
      ],
      highlighted: false,
      cta: "Get Started",
      ctaVariant: "outline" as const,
    },
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Great for small agencies and creators",
      features: [
        "Unlimited posts",
        "Multi-platform publishing (up to 2)",
        "Advanced editor with templates",
        "Email support",
        "Detailed analytics & insights",
        "Post scheduling",
        "Content library (100MB)",
      ],
      highlighted: true,
      cta: "Start Free Trial",
      ctaVariant: "default" as const,
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      description: "For growing agencies and teams",
      features: [
        "Unlimited everything",
        "All 4 platforms (Twitter, Facebook, Instagram, X)",
        "Team collaboration (up to 5 users)",
        "Priority support 24/7",
        "Advanced analytics & reporting",
        "Custom branding options",
        "API access",
        "Bulk content library (1TB)",
        "White-label solution available",
        "AI-Generated Analytics Dashboards",
        "AI Post Engagement Predictions",
        "Smart Content Recommendations",
        "AI-Powered Sentiment Analysis",
        "Automatic Hashtag & Caption Generation",
        "Performance Forecasting with Machine Learning",
      ],
      highlighted: false,
      cta: "Contact Sales",
      ctaVariant: "default" as const,
    },
  ]

  return (
    <div className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your agency. Always flexible, always fair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-card shadow-lg scale-105 md:scale-100 md:ring-2 md:ring-primary/50"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>

                <Link href="/auth/login" className="block">
                  <Button
                    size="lg"
                    variant={plan.ctaVariant}
                    className={`w-full ${
                      plan.highlighted ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90" : ""
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="space-y-3 pt-4 max-h-96 overflow-y-auto">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom plan for your enterprise? We{"'"}ve got you covered.
          </p>
          <Button variant="outline">Schedule a Demo</Button>
        </div>
      </div>
    </div>
  )
}
