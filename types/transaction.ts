export interface Transaction {
  id: string;
  user_id: string;
  type: 'credit' | 'debit';
  amount: number;
  category: string | null;
  description: string | null;
  status: string | null;
  created_at: string;
}