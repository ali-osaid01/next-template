"use client";

import Link from "next/link";
import { paths } from "@/paths";
import { useActiveLink } from "@/hooks";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: paths.dashboard.root },
  // Add more nav items here as features grow
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
      <Link href={paths.root} className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        App
      </Link>
      <div className="flex items-center gap-4">{/* User menu / notifications go here */}</div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 px-3 py-4 dark:border-zinc-800">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}

function NavLink({ href, label }: NavItem) {
  const active = useActiveLink(href);

  return (
    <Link
      href={href}
      className={[
        "flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors",
        active
          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
