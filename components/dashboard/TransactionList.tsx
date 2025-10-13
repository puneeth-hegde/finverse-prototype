import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {transactions.map((t) => {
              const sign = t.type === "debit" ? "-" : "+";
              const amountClass = t.type === "credit" ? "text-finance-green" : "text-finance-red";

              return (
                <li key={t.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{t.description}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.category}</p>
                    </div>
                    <div className={`ml-4 shrink-0 text-sm font-medium ${amountClass}`}>
                      {`${sign} ${formatINR(t.amount)}`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}