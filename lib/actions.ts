'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { redirect } from 'next/dist/client/components/navigation'

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  target_amount: z.coerce.number().positive('Target must be positive'),
  icon: z.string().min(1, 'Icon is required'),
})

export async function createSavingsGoal(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in to create a goal.')
  }

  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    target_amount: formData.get('target_amount'),
    icon: formData.get('icon'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, target_amount, icon } = validatedFields.data

  const { error } = await supabase
    .from('savings_goals')
    .insert({
      user_id: user.id,
      title,
      target_amount,
      icon,
      // You can add color later if you want
    })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error('Failed to create savings goal.')
  }

  // Revalidate the path to refresh the data on the page
  revalidatePath('/savings')
}
export async function createLoanRequest(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be logged in to apply for a loan.');
  }

  // Basic validation, can be expanded with Zod
  const amount = Number(formData.get('amount'));
  const interest_rate = Number(formData.get('interest_rate'));
  const duration_months = Number(formData.get('duration_months'));
  const purpose = String(formData.get('purpose'));

  // Simple risk assessment for the prototype
  let risk_level: 'low' | 'medium' | 'high' = 'medium';
  if (interest_rate < 14) risk_level = 'low';
  if (interest_rate > 17) risk_level = 'high';

  const { error } = await supabase
    .from('loans')
    .insert({
      borrower_id: user.id,
      amount,
      interest_rate,
      duration_months,
      purpose,
      risk_level,
      status: 'pending', // New loans are always pending
    });

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Failed to create loan request.');
  }

  // We don't need to revalidate the path here, as the user won't see their own loan in the marketplace
}
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
}