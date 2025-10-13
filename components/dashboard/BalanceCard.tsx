import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BalanceCardProps {
  balance: number;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Total Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-4xl font-semibold tracking-tight md:text-5xl">
          ₹{balance.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-green-500" aria-label="Balance change">
          +2.5% this month
        </div>
      </CardContent>
    </Card>
  );
}