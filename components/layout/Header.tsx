'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut } from '@/lib/actions'; // Import the sign out action
import {
  LayoutDashboard,
  Banknote,
  Landmark,
  HandCoins,
  Lightbulb,
  Bot,
  PanelLeft,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Credit Score', href: '/credit-score', icon: Banknote },
  { name: 'Savings', href: '/savings', icon: Landmark },
  { name: 'Lending', href: '/lending', icon: HandCoins },
  { name: 'Learn', href: '/learn', icon: Lightbulb },
  { name: 'Advisor', href: '/advisor', icon: Bot },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs flex flex-col p-0">
          <nav className="grid gap-6 text-lg font-medium p-4">
            <Link href="/dashboard" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <span className="text-2xl">🏦</span>
              <span className="sr-only">FinVerse</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          {/* This is the new part that adds the logout button */}
          <div className="mt-auto p-4 border-t">
            <form action={signOut}>
              <Button variant="ghost" className="w-full justify-start">
                Logout
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}