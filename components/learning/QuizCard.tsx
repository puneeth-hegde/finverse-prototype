import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  category: {
    title: string;
    description: string;
    icon: string;
  };
  onStart: () => void;
}

export function QuizCard({ category, onStart }: QuizCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          {category.title}
        </CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button onClick={onStart} className="w-full">Start Quiz</Button>
      </CardFooter>
    </Card>
  );
}