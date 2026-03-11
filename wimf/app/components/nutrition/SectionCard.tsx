import type { ReactNode } from "react";
import { useTheme } from "~/context/ThemeContext";

interface SectionCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  const { theme } = useTheme();
  return (
    <div className="rounded-3xl p-8 dark:border-gray-600 bg-white/65 dark:bg-gray-700 box-shadow-custom transition-colors duration-200">
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
