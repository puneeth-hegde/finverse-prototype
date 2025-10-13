import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// A placeholder type for now
type Loan = {
  amount: number;
  interest_rate: number;
  duration_months: number;
  purpose: string;
  risk_level: 'low' | 'medium' | 'high';
}

interface LoanCardProps {
  loan: Loan;
}

const riskColorMap = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
}

export function LoanCard({ loan }: LoanCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Loan Request: ₹{loan.amount.toLocaleString('en-IN')}</CardTitle>
          <Badge className={`${riskColorMap[loan.risk_level]} text-white`}>{loan.risk_level.charAt(0).toUpperCase() + loan.risk_level.slice(1)} Risk</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{loan.purpose}</p>
        <div className="flex justify-between text-sm">
          <span>Interest Rate:</span>
          <span className="font-medium">{loan.interest_rate}% p.a.</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Duration:</span>
          <span className="font-medium">{loan.duration_months} months</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Fund This Loan</Button>
      </CardFooter>
    </Card>
  );
}