import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

export function Toast({ message, duration = 2000, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
        {message}
      </div>
    </div>
  );
}

/* Add this to app.css for the animation */
export const toastAnimation = `
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  
  .animate-fade-in-out {
    animation: fadeInOut 2s ease-in-out forwards;
  }
`;
