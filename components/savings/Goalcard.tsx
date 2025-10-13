import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SavingsGoal = {
  icon: string;
  title: string;
  current_amount: number;
  target_amount: number;
}

interface GoalCardProps {
  goal: SavingsGoal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.current_amount / goal.target_amount) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
        <span className="text-2xl">{goal.icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ₹{goal.current_amount.toLocaleString('en-IN')}
        </div>
        <p className="text-xs text-muted-foreground">
          saved of ₹{goal.target_amount.toLocaleString('en-IN')}
        </p>
        <Progress value={progress} className="mt-4" />
      </CardContent>
    </Card>
  );
}