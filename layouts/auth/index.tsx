import Link from "next/link";
import { paths } from "@/paths";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href={paths.root} className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            App
          </Link>
          {title && (
            <h1 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
          )}
          {description && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          )}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  );
}
