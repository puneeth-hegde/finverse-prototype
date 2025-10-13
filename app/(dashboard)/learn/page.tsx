'use client'

import { useState } from 'react';
import { QuizCard } from '@/components/learning/QuizCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Placeholder quiz data for the prototype
const quizData = {
  budgeting: {
    title: "Budgeting Basics",
    description: "Learn how to manage your income and expenses.",
    icon: "📊",
    questions: [
      { q: "What is the 50/30/20 rule?", a: ["Needs/Wants/Savings", "Savings/Needs/Wants", "Wants/Needs/Savings"], correct: 0 },
      { q: "What is a good first step to creating a budget?", a: ["Track your spending", "Cut all expenses", "Invest in stocks"], correct: 0 },
    ],
  },
  investing: {
    title: "Intro to Investing",
    description: "Understand the basics of making your money grow.",
    icon: "📈",
    questions: [
      { q: "What does 'diversification' mean?", a: ["Putting all money in one stock", "Spreading investments across different assets", "Only buying bonds"], correct: 1 },
      { q: "Which is generally considered a higher-risk investment?", a: ["Government Bond", "Mutual Fund", "Individual Stock"], correct: 2 },
    ],
  },
};

type QuizCategory = keyof typeof quizData;

export default function LearnPage() {
  const [activeQuiz, setActiveQuiz] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleStartQuiz = (category: QuizCategory) => {
    setActiveQuiz(category);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!activeQuiz) return;
    const question = quizData[activeQuiz].questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData[activeQuiz].questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
  }

  // Main view showing quiz categories
  if (!activeQuiz) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold">Financial Literacy Hub</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <QuizCard category={quizData.budgeting} onStart={() => handleStartQuiz('budgeting')} />
          <QuizCard category={quizData.investing} onStart={() => handleStartQuiz('investing')} />
        </div>
      </div>
    );
  }

  // View for when the quiz is finished
  if (quizFinished) {
    return (
      <div className="p-4 md:p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-xl">You scored {score} out of {quizData[activeQuiz].questions.length}</p>
        <Button onClick={resetQuiz}>Back to All Quizzes</Button>
      </div>
    )
  }

  // View for an active quiz question
  const currentQuestion = quizData[activeQuiz].questions[currentQuestionIndex];
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">{quizData[activeQuiz].title}</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-lg font-semibold">{currentQuestion.q}</p>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.a.map((option, index) => (
              <Button key={index} variant="outline" className="justify-start p-6 text-left h-auto" onClick={() => handleAnswer(index)}>
                {option}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Score: {score}</p>
        </CardContent>
      </Card>
    </div>
  );
}