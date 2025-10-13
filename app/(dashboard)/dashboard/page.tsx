import { createClient } from '@/lib/supabase/server';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AssetAllocationCard } from '@/components/dashboard/AssetAllocationCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import type { Transaction } from '@/types/transaction';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();

  // We can safely get the user ID here because the layout has already protected the page
  const { data: { user } } = await supabase.auth.getUser();

  const [profileRes, transactionsRes] = await Promise.all([
    supabase.from('profiles').select('balance').eq('id', user!.id).single(),
    supabase.from('transactions').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5)
  ]);

  const balance = profileRes.data?.balance ?? 0;
  const transactions = (transactionsRes.data as Transaction[]) ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <header className="mb-6 md:mb-8">
        <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Dashboard</h1>
      </header>

      <section aria-label="Overview" className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <BalanceCard balance={balance} />
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <AssetAllocationCard />
        </div>
      </section>

      <section aria-label="Recent Transactions" className="mt-6 lg:mt-8">
        <TransactionList transactions={transactions} />
      </section>
    </main>
  );
}