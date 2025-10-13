import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DollarSign, ShieldCheck, TrendingUp, BookOpen } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <span className="text-2xl">🏦</span>
          <span className="ml-2 text-lg font-semibold">FinVerse</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-finverse text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Financial Access for Everyone
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                FinVerse is an AI-powered platform unlocking financial opportunities for everyone, everywhere.
              </p>
              <Link href="/signup">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">An All-In-One Financial Platform</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to build your financial future, right at your fingertips.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16 mt-12">
              <div className="grid gap-1 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Alternative Credit</h3>
                <p className="text-sm text-muted-foreground">Get a fair credit score using AI, even with no prior history.</p>
              </div>
              <div className="grid gap-1 text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">P2P Lending</h3>
                <p className="text-sm text-muted-foreground">Access capital from a community of lenders, or grow your own savings.</p>
              </div>
              <div className="grid gap-1 text-center">
                <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Smart Savings</h3>
                <p className="text-sm text-muted-foreground">Create and track savings goals with gamified encouragement.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Financial Education</h3>
                <p className="text-sm text-muted-foreground">Improve your knowledge with interactive quizzes and an AI advisor.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 FinVerse. All rights reserved.</p>
      </footer>
    </div>
  )
}