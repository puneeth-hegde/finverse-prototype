import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/actions';
import {
  LayoutDashboard,
  Banknote,
  Landmark,
  HandCoins,
  Lightbulb,
  Bot,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Credit Score', href: '/credit-score', icon: Banknote },
  { name: 'Savings', href: '/savings', icon: Landmark },
  { name: 'Lending', href: '/lending', icon: HandCoins },
  { name: 'Learn', href: '/learn', icon: Lightbulb },
  { name: 'Advisor', href: '/advisor', icon: Bot },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-muted/40 border-r">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          FinVerse
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t mt-auto">
        <form action={signOut}>
          <Button variant="ghost" className="w-full justify-start">
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
}