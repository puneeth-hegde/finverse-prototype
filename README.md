# **FinVerse: AI-Powered Financial Inclusion Platform**

> **Empowering the world’s unbanked through data, intelligence, and inclusion.**

FinVerse is a **full-stack AI-driven financial inclusion platform prototype** designed to unlock financial opportunities for individuals who are underserved or excluded by traditional banking systems.
It combines **alternative data**, **AI-powered insights**, and **community-based finance** to enable users to build credit, access affordable capital, and improve financial literacy — all through one unified digital experience.

---

## Live Demo

**Deployed on:** [Netlify](https://finverse-prototype.netlify.app/)

## **Project Overview**

Financial exclusion remains one of the world’s most pressing challenges. FinVerse addresses this by providing a **modern, scalable, and intelligent fintech architecture** that bridges the gap between traditional finance and emerging markets.

This prototype demonstrates how cutting-edge technologies like **AI**, **Groq inference**, and **Supabase** can be combined to create an accessible, inclusive financial ecosystem.

---

## **Core Features**

FinVerse offers six core, production-grade features with complete authentication, data persistence, and responsive UI/UX.

| Feature                           | Description                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Secure Authentication**      | Complete onboarding flow — signup, login, password reset, and email verification — powered by Supabase Auth.   |
| **AI Credit Scoring**          | Proprietary algorithm (300–850) using **alternative data** such as rent, utility payments, and mobile usage.   |
| **AI Financial Advisor**       | Real-time, chat-based assistant powered by **Groq’s Llama 3 model**, offering financial guidance and insights. |
| **Micro-Savings Goals**        | Interactive savings tracker with progress visualization and target management.                                 |
| **P2P Lending Marketplace**    | Community-driven lending ecosystem where users can browse, apply for, or fund peer-to-peer loans.              |
| **Financial Literacy Hub**     | Interactive quiz module to improve users’ knowledge on budgeting, saving, and investing.                       |
| **Responsive UI/UX**           | Modern, accessible design using **Tailwind CSS** + **shadcn/ui** with seamless desktop and mobile experiences. |
| **3D Dashboard Visualization** | Real-time 3D components (via React Three Fiber) to display user portfolio data dynamically.                    |

---

## **Tech Stack**

Built with a **TypeScript-first**, **Next.js App Router** architecture for scalability, speed, and developer efficiency.

| Category               | Technology                                                              | Version  | Purpose                            |
| ---------------------- | ----------------------------------------------------------------------- | -------- | ---------------------------------- |
| **Framework**          | [Next.js](https://nextjs.org/)                                          | 14.2.5   | Full-stack React framework         |
| **Language**           | TypeScript                                                              | ~5.5.4   | Type safety and maintainability    |
| **Database / Auth**    | [Supabase](https://supabase.com/)                                       | ~2.44.4  | Postgres + Auth + APIs             |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                | ~3.4.4   | Utility-first CSS                  |
| **UI Components**      | [shadcn/ui](https://ui.shadcn.com/)                                     | —        | Modern, accessible UI primitives   |
| **AI Integration**     | [Groq SDK](https://groq.com/)                                           | ~0.5.0   | High-speed inference for Llama 3   |
| **3D Graphics**        | [React Three Fiber / Drei](https://github.com/pmndrs/react-three-fiber) | ~8.16.8  | Declarative 3D scenes in React     |
| **Forms & Validation** | React Hook Form + Zod                                                   | ~7.52.1  | Reliable and typed form validation |
| **Animations**         | [Framer Motion](https://www.framer.com/motion/)                         | ~11.3.19 | UI transitions and motion          |
| **Charts**             | [Recharts](https://recharts.org/)                                       | ~2.12.7  | Interactive data visualization     |

---

## **Getting Started**

Follow these steps to set up and run FinVerse locally:

### 1. Clone the Repository

```bash
git clone https://github.com/puneeth-hegde/finverse-prototype.git
cd finverse
```

### 2. Install Dependencies

This project uses **pnpm** for optimal package management.

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq API
GROQ_API_KEY=your_groq_api_key
```

### 4. Database Setup (Supabase)

* Create a new project at [supabase.com](https://supabase.com/).
* Go to **SQL Editor → New Query** and paste the [Schema Script](#-database-schema).
* Click **RUN** to create all tables, relationships, and RLS policies.

### 5. Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Database Schema**

> Complete SQL setup for Supabase — includes RLS policies and auto-profile creation triggers.

<details>
<summary>View SQL Script</summary>

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT DEFAULT 'India',
  balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Scores
CREATE TABLE public.credit_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 300 AND score <= 850),
  utility_payment_score INTEGER,
  mobile_usage_score INTEGER,
  rent_payment_score INTEGER,
  ecommerce_score INTEGER,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  factors JSONB
);

-- Transactions
CREATE TABLE public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('credit', 'debit')),
  amount DECIMAL(10,2) NOT NULL,
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Savings Goals
CREATE TABLE public.savings_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0.00,
  deadline DATE,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE
);

-- Loans
CREATE TABLE public.loans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  borrower_id UUID REFERENCES public.profiles(id),
  lender_id UUID REFERENCES public.profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  purpose TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','active','repaid','defaulted')),
  risk_level TEXT CHECK (risk_level IN ('low','medium','high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  funded_at TIMESTAMP WITH TIME ZONE,
  repaid_at TIMESTAMP WITH TIME ZONE
);

-- Financial Literacy Quiz Progress
CREATE TABLE public.quiz_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]'::jsonb,
  last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat History
CREATE TABLE public.chat_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  role TEXT CHECK (role IN ('user','assistant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own credit scores" ON public.credit_scores FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own transactions" ON public.transactions FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own savings goals" ON public.savings_goals FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view loans" ON public.loans FOR SELECT USING ((status='pending' AND auth.role()='authenticated') OR (auth.uid()=borrower_id OR auth.uid()=lender_id));
CREATE POLICY "Users can create loans" ON public.loans FOR INSERT WITH CHECK (auth.uid()=borrower_id);

ALTER TABLE public.quiz_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their quiz progress" ON public.quiz_progress FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their chat history" ON public.chat_history FOR ALL USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (new.id, new.email);
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

</details>

---

## **Implementation Overview**

| Phase                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| **1. Project Setup**             | Initialized a Next.js 14 + TypeScript app, configured Tailwind and shadcn/ui, added dependencies. |
| **2. Database Architecture**     | Executed full schema and RLS setup in Supabase.                                                   |
| **3. Core Feature Development**  | Built authentication, dashboards, and all AI + finance modules.                                   |
| **4. Polishing & UI Refinement** | Added mobile responsiveness, loading states, and error handling.                                  |
| **5. Deployment**                | Deployed on **Netlify** with environment variables configured for production.                     |

---

## **Future Enhancements**

| Enhancement                        | Description                                                   |
| ---------------------------------- | ------------------------------------------------------------- |
| **Payment Gateway Integration** | Integrate **Stripe** or **Razorpay** for real transactions.   |
| **Dynamic 3D Visuals**          | Link 3D dashboard assets to live financial data.              |
| **Quiz Backend**                | Store and manage quiz questions and user scores in Supabase.  |
| **Realtime Notifications**      | Push notifications via **Supabase Realtime** for key updates. |
| **User Profile Pages**          | Allow users to view and update profile details.               |
| **Dark Mode**                   | Implement global light/dark theme toggle.                     |

---

## **Project Philosophy**

FinVerse was built with three guiding principles:

1. **Accessibility:** Everyone, regardless of geography or income, deserves access to financial opportunity.
2. **Transparency:** Open architecture, fair algorithms, and user control of data.
3. **Education:** Empower users through knowledge, not just transactions.

---

## **Inspiration**

FinVerse is inspired by the **United Nations Sustainable Development Goals (SDG 8 & 10)** — promoting **economic growth** and **reducing inequalities** through financial inclusion and digital innovation.

---


---

## **License**

This project is released under the **MIT License** — feel free to use, modify, and build upon it with proper attribution.

---

