FinVerse: AI-Powered Financial Inclusion Platform
FinVerse is a full-stack prototype of an AI-powered platform designed to unlock financial opportunities for everyone, everywhere.

This project was built to demonstrate a modern, scalable solution to the global challenge of financial exclusion. By leveraging alternative data, artificial intelligence, and community-based finance, FinVerse provides a suite of tools to help users build credit, access capital, and improve their financial literacy.

🎯 Core Features
This prototype includes 6 core functional features, a complete authentication flow, and a responsive, modern user interface.

Secure Authentication: Complete user onboarding with email/password signup, login, and a secure "Forgot Password" flow.

AI Credit Scoring: A proprietary algorithm that generates a fair credit score (300-850) based on alternative data points like utility payments, rent history, and mobile usage.

AI Financial Advisor: A real-time chat interface powered by the Groq Llama 3 model, providing instant financial advice and guidance.

Micro-Savings Goals: An interface for users to create, track, and manage their personal savings goals.

P2P Lending Marketplace: A community marketplace where users can view pending loan requests and apply for their own peer-to-peer loans.

Financial Literacy Hub: An interactive quiz system to help users learn about key financial concepts like budgeting and investing.

Responsive UI/UX: A modern, polished interface with a responsive sidebar for desktop and a slide-out menu for mobile, ensuring a seamless experience on any device.

3D Visualization: An interactive 3D component on the dashboard to showcase modern frontend capabilities.

🛠️ Tech Stack & Versions
This project is built with a modern, full-stack TypeScript architecture.

Category

Technology / Library

Version

Purpose

Framework

Next.js

14.2.5

Full-stack React framework (App Router)

Language

TypeScript

~5.5.4

Type safety for scalable development

Backend

Supabase

~2.44.4

PostgreSQL Database, Auth, and APIs

Styling

Tailwind CSS

~3.4.4

Utility-first CSS framework

UI Components

shadcn/ui

N/A

Accessible and customizable component library

AI Integration

Groq SDK

~0.5.0

High-speed inference for Llama 3

3D Graphics

React Three Fiber / Drei

~8.16.8

Declarative 3D graphics for React

State/Forms

React Hook Form / Zod

~7.52.1

Form management and validation

Animation

Framer Motion

~11.3.19

UI animations and transitions

Charts

Recharts

~2.12.7

Data visualization

🚀 Getting Started
To run this project locally, follow these steps:

Clone the repository:

git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)
cd finverse-prototype

Install dependencies:
This project uses pnpm as the package manager.

pnpm install

Set up environment variables:

Create a file named .env.local in the root of the project.

Add your Supabase and Groq API keys:

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq API
GROQ_API_KEY=your_groq_api_key

Set up the Supabase Database:
Follow the detailed Database Setup Guide in the section below to create all necessary tables and policies.

Run the development server:

pnpm dev

Open http://localhost:3000 with your browser to see the result.

🗃️ Database Setup Guide
This project requires a specific database schema on Supabase.

Create a Supabase Project: Go to supabase.com, create a new project, and find your API keys and Project URL in the Project Settings > API section.

Open the SQL Editor: In your Supabase project dashboard, navigate to the SQL Editor section.

Run the Schema Script: Create a new query and paste the entire SQL script below. This will create all tables, indexes, security policies, and functions needed for the app. Click "RUN".

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create all tables for user data, transactions, loans, etc.
CREATE TABLE public.profiles (id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, avatar_url TEXT, phone TEXT, country TEXT DEFAULT 'India', balance DECIMAL(12, 2) DEFAULT 0.00, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE public.credit_scores (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, score INTEGER CHECK (score >= 300 AND score <= 850), utility_payment_score INTEGER, mobile_usage_score INTEGER, rent_payment_score INTEGER, ecommerce_score INTEGER, calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), factors JSONB);
CREATE TABLE public.transactions (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, type TEXT CHECK (type IN ('credit', 'debit')), amount DECIMAL(10, 2) NOT NULL, category TEXT, description TEXT, status TEXT DEFAULT 'completed', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE public.savings_goals (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, title TEXT NOT NULL, target_amount DECIMAL(10, 2) NOT NULL, current_amount DECIMAL(10, 2) DEFAULT 0.00, deadline DATE, icon TEXT, color TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), completed BOOLEAN DEFAULT FALSE);
CREATE TABLE public.loans (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, borrower_id UUID REFERENCES public.profiles(id), lender_id UUID REFERENCES public.profiles(id), amount DECIMAL(10, 2) NOT NULL, interest_rate DECIMAL(5, 2) NOT NULL, duration_months INTEGER NOT NULL, purpose TEXT, status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'repaid', 'defaulted')), risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')), created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), funded_at TIMESTAMP WITH TIME ZONE, repaid_at TIMESTAMP WITH TIME ZONE);
CREATE TABLE public.quiz_progress (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, category TEXT NOT NULL, questions_answered INTEGER DEFAULT 0, correct_answers INTEGER DEFAULT 0, badges JSONB DEFAULT '[]'::jsonb, last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE public.chat_history (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, message TEXT NOT NULL, role TEXT CHECK (role IN ('user', 'assistant')), created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());

-- Enable Row Level Security and create policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own credit scores" ON public.credit_scores FOR ALL USING (auth.uid() = user_id);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own transactions" ON public.transactions FOR ALL USING (auth.uid() = user_id);
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own savings goals" ON public.savings_goals FOR ALL USING (auth.uid() = user_id);
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view loans" ON public.loans FOR SELECT USING ((status = 'pending' AND auth.role() = 'authenticated') OR (auth.uid() = borrower_id OR auth.uid() = lender_id));
CREATE POLICY "Users can create loan requests" ON public.loans FOR INSERT WITH CHECK (auth.uid() = borrower_id);
ALTER TABLE public.quiz_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own quiz progress" ON public.quiz_progress FOR ALL USING (auth.uid() = user_id);
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own chat history" ON public.chat_history FOR ALL USING (auth.uid() = user_id);

-- Create function and trigger to auto-create a profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$BEGIN INSERT INTO public.profiles (id, email) VALUES (new.id, new.email); RETURN new; END;$$;
CREATE OR REPLACE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

📝 Implementation Steps
This prototype was built following a structured, feature-driven plan.

Project Setup:

Initialized a Next.js 14 project with TypeScript and Tailwind CSS.

Installed all necessary dependencies for UI, data, AI, and 3D graphics.

Configured shadcn/ui and added base components.

Set up environment variables for API keys.

Database Architecture:

Executed the SQL script (above) on Supabase to create the entire database schema and security policies.

Core Feature Development:

Authentication: Built the Signup, Login, Forgot Password, and email confirmation flows.

Dashboard: Created the main user dashboard to serve as a hub, fetching and displaying live user data.

AI Credit Scoring: Implemented the frontend form and backend API route to calculate and save an alternative credit score.

AI Financial Advisor: Built the chat interface and the API route to connect with the Groq API.

Savings Goals: Developed the UI to display goals and a modal with a Server Action to create new ones.

P2P Lending: Built the marketplace view and a modal with a Server Action for users to apply for loans.

Financial Literacy Quiz: Created a client-side interactive quiz as a proof-of-concept.

Polishing and Finalization:

Responsive Navigation: Added a persistent desktop sidebar and a responsive mobile header with a slide-out menu.

Landing Page: Built a professional, welcoming landing page for new visitors.

UI/UX Refinements: Added loading states and fixed various layout and styling issues to create a smoother user experience.

Deployment: Configured the project for production and deployed it live via Netlify.

✨ Future Enhancements
This prototype serves as a strong foundation. Future development could include:

Payment Gateway Integration: Connecting a service like Stripe or Razorpay to handle real money transfers for "Add Money" and "Fund Loan" actions.

Data-Driven 3D Visualization: Linking the 3D asset component to a user's actual portfolio data.

Full Quiz System: Building out the backend for the quiz, storing questions and user progress in the database.

Notifications: Implementing real-time notifications (e.g., "Your loan has been funded!") using Supabase Realtime.

User Profiles: Creating a dedicated page for users to view and edit their profile information.

Dark Mode: Implementing a theme switcher to toggle between light and dark modes.
