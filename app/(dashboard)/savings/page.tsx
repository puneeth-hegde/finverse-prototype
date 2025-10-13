import { createClient } from '@/lib/supabase/server';
import { GoalCard } from "@/components/savings/GoalCard";
import { CreateGoalModal } from "@/components/savings/CreateGoalModal"; // Import the new modal

export type SavingsGoal = {
  id: string;
  icon: string;
  title: string;
  current_amount: number;
  target_amount: number;
}

export const dynamic = 'force-dynamic';

export default async function SavingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: goals } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', user!.id);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Savings Goals</h1>
        {/* Replace the static button with our interactive modal component */}
        <CreateGoalModal />
      </div>

      {goals && goals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal: SavingsGoal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You don't have any savings goals yet.</p>
          <p className="text-muted-foreground">Click "+ New Goal" to get started!</p>
        </div>
      )}
    </div>
  );
}