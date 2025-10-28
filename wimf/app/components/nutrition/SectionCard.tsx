import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}
