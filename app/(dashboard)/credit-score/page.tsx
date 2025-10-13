'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"

// Define the form schema using Zod
const formSchema = z.object({
  utility: z.number().min(0).max(100),
  mobile: z.number().min(0).max(100),
  rent: z.number().min(0).max(100),
  ecommerce: z.number().min(0).max(100),
})

export default function CreditScorePage() {
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { utility: 80, mobile: 90, rent: 95, ecommerce: 70 },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
  setLoading(true);
  setScore(null);

  try {
    const response = await fetch('/api/credit-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate score');
    }

    const data = await response.json();
    setScore(data.score);
  } catch (error) {
    console.error(error);
    alert('There was a problem calculating your score.');
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">Alternative Credit Score</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Score</CardTitle>
            <CardDescription>Enter your data points (0-100) to generate a score.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* All the slider fields */}
                <FormField control={form.control} name="utility" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utility Payment History ({field.value})</FormLabel>
                    <FormControl>
                      <Slider defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={100} step={1} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="mobile" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Usage Consistency ({field.value})</FormLabel>
                    <FormControl>
                      <Slider defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={100} step={1} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="rent" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Payment History ({field.value})</FormLabel>
                    <FormControl>
                      <Slider defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={100} step={1} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="ecommerce" render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-commerce Activity ({field.value})</FormLabel>
                    <FormControl>
                      <Slider defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={100} step={1} />
                    </FormControl>
                  </FormItem>
                )} />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Calculating...' : 'Calculate Score'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center p-6">
          <div className="text-center">
            {loading && <p>Generating your score...</p>}
            {score && (
              <>
                <p className="text-lg text-muted-foreground">Your Score is</p>
                <p className="text-7xl font-bold text-primary">{score}</p>
              </>
            )}
            {!loading && !score && <p className="text-center text-muted-foreground">Your score will appear here.</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}