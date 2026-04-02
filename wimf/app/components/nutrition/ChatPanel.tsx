import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessageBubble } from "./ChatMessage";
import type { FormUpdates } from "~/services/chatService";

interface Message {
  role: "user" | "model";
  content: string;
}

interface ChatPanelProps {
  onFormUpdate: (updates: FormUpdates) => void;
  currentProfile: Record<string, unknown>;
  initialHistory?: Message[];
}

export function ChatPanel({ onFormUpdate, currentProfile, initialHistory = [] }: ChatPanelProps) {
  const isBrandNew = initialHistory.length === 0;

  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(!isBrandNew);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onboardingFetched = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchOnboarding = useCallback(async () => {
    if (onboardingFetched.current || !isBrandNew) return;
    onboardingFetched.current = true;
    setIsLoading(true);
    try {
      const response = await fetch("/api/nutrition-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "__onboard__",
          history: [],
          currentProfile,
        }),
      });
      if (response.ok) {
        const data = await response.json() as { aiText: string; formUpdates: FormUpdates };
        setMessages([{ role: "model", content: data.aiText }]);
      } else {
        setMessages([{ role: "model", content: "Hi! 👋 I'm your AI Nutrition Assistant. Tell me about yourself — your height, weight, and goals — and I'll build you a personalized meal plan!" }]);
      }
    } catch {
      setMessages([{ role: "model", content: "Hi! 👋 I'm your AI Nutrition Assistant. Tell me about yourself — your height, weight, and goals — and I'll build you a personalized meal plan!" }]);
    } finally {
      setIsLoading(false);
      setOnboardingDone(true);
    }
  }, [isBrandNew, currentProfile]);

  useEffect(() => {
    fetchOnboarding();
  }, [fetchOnboarding]);

  async function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading || !onboardingDone) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyForApi = messages.filter((m, i) => !(i === 0 && m.role === "model" && isBrandNew));

      const response = await fetch("/api/nutrition-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          currentProfile,
        }),
      });

      if (!response.ok) {
        const err = await response.json() as { error?: string };
        throw new Error(err.error ?? "Request failed");
      }

      const data = await response.json() as {
        aiText: string;
        formUpdates: FormUpdates;
      };

      const aiMsg: Message = { role: "model", content: data.aiText };
      setMessages((prev) => [...prev, aiMsg]);

      if (data.formUpdates && Object.keys(data.formUpdates).length > 0) {
        onFormUpdate(data.formUpdates);
      }
    } catch (err) {
      const errorMsg: Message = {
        role: "model",
        content:
          err instanceof Error
            ? `Sorry, I ran into an issue: ${err.message}`
            : "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[580px] rounded-3xl bg-teal-700 dark:bg-teal-900 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-teal-600 dark:border-teal-800">
        <h2 className="text-lg font-bold text-white">AI Nutrition Assistant</h2>
        <p className="text-sm text-teal-200 mt-0.5">Personalized meal plans powered by AI ✨</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-gray-50 dark:bg-gray-800/60">
        {messages.map((msg, i) => (
          <ChatMessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center mr-2 flex-shrink-0 text-white text-xs font-bold">
              AI
            </div>
            <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-teal-600 dark:border-teal-800 bg-teal-700 dark:bg-teal-900">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            id="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 text-sm border-none outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 transition-all"
          />
          <button
            id="chat-send-btn"
            type="button"
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-teal-600 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm flex-shrink-0"
          >
            {/* Send icon */}
            <svg
              className="w-4 h-4 text-white translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
