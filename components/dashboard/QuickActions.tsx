import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <Button>{"Add Money"}</Button>
          <Button variant="secondary">{"Send Money"}</Button>
          <Button variant="outline">{"Savings Goals"}</Button>
        </div>
      </CardContent>
    </Card>
  )
}