import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <div className="rounded-3xl p-8 dark:border-gray-700 bg-white/65 dark:bg-gray-800 box-shadow-custom transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-1">
        {title}
      </h2>
      <h3 className="text-s text-gray-700 dark:text-gray-200 mb-4">
        {subtitle}
      </h3>
      {children}
    </div>
  );
}
