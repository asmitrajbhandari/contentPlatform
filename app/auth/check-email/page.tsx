import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Check your email</h1>
            <p className="text-muted-foreground">
              We've sent you a confirmation link. Please check your email to verify your account.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full bg-primary hover:bg-primary/90">Back to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
