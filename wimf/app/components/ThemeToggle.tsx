import { useTheme } from "~/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-4 pl-4 border-l border-outline-variant/20">
      <span className="hidden md:block text-sm font-medium text-on-surface-variant font-label uppercase tracking-widest">
        Settings
      </span>
      <button
        onClick={toggleTheme}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="h-9 w-9 rounded-full ring-2 ring-primary/10 flex items-center justify-center text-primary bg-surface-container hover:bg-surface-container-high hover:scale-105 active:scale-95 transition-all shadow-sm"
      >
        <span className="material-symbols-outlined text-sm">
          {theme === "dark" ? "light_mode" : "dark_mode"}
        </span>
      </button>
    </div>
  );
}
