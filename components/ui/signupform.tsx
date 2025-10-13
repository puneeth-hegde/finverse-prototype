import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FinverseSignupForm() {
  return (
    <form className="grid gap-4" action="#" method="post">
      <div className="grid gap-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          aria-required="true"
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
          aria-required="true"
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  )
}
