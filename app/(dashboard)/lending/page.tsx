import { createClient } from '@/lib/supabase/server';
import { LoanCard } from "@/components/lending/LoanCard";
import { ApplyLoanModal } from '@/components/lending/ApplyLoanModal'; // Import the new modal

export type Loan = {
  id: string;
  amount: number;
  interest_rate: number;
  duration_months: number;
  purpose: string;
  risk_level: 'low' | 'medium' | 'high';
};

export const dynamic = 'force-dynamic';

export default async function LendingPage() {
  const supabase = createClient();

  const { data: loans } = await supabase
    .from('loans')
    .select('*')
    .eq('status', 'pending');

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">P2P Lending Marketplace</h1>
        {/* Replace the static button with our interactive modal component */}
        <ApplyLoanModal />
      </div>

      {loans && loans.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan: Loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">There are no pending loan requests at the moment.</p>
        </div>
      )}
    </div>
  );
}