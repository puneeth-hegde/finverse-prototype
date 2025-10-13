'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  // --- This is the logic that was missing ---
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the confirmation link!')
      router.push('/login')
    }
    setLoading(false)
  }
  // --- End of logic ---

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create Your FinVerse Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* We connect the form to our logic with onSubmit */}
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                // We connect the input to our logic here
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter a secure password"
                required
                minLength={6}
                // We connect the input to our logic here
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* We connect the button to our logic here */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}