import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Asset3DVisualization } from "./Asset3DVisualization"

export function AssetAllocationCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Asset3DVisualization />
      </CardContent>
    </Card>
  )
}