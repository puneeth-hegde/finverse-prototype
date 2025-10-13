import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateCreditScore } from '@/lib/credit-algorithm';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inputs = await request.json();

  const { score, factors } = calculateCreditScore(inputs);

  const { error } = await supabase.from('credit_scores').insert({
    user_id: user.id,
    score: score,
    utility_payment_score: factors.utility,
    mobile_usage_score: factors.mobile,
    rent_payment_score: factors.rent,
    ecommerce_score: factors.ecommerce,
    factors: factors,
  });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }

  return NextResponse.json({ score });
}