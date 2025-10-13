'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createLoanRequest } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  interest_rate: z.coerce.number().positive('Rate must be positive'),
  duration_months: z.coerce.number().int().positive('Duration must be a whole number'),
  purpose: z.string().min(10, 'Please provide a brief purpose (min. 10 characters)'),
});

export function ApplyLoanModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { amount: 10000, interest_rate: 15, duration_months: 12, purpose: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append('amount', String(data.amount));
    formData.append('interest_rate', String(data.interest_rate));
    formData.append('duration_months', String(data.duration_months));
    formData.append('purpose', data.purpose);
    
    await createLoanRequest(formData);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Apply for a Loan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for a New Loan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="amount" render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount (₹)</FormLabel>
                <FormControl><Input type="number" placeholder="15000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="interest_rate" render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (% p.a.)</FormLabel>
                <FormControl><Input type="number" step="0.1" placeholder="14.5" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="duration_months" render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (Months)</FormLabel>
                <FormControl><Input type="number" placeholder="12" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="purpose" render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl><Input placeholder="To expand my small business" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}