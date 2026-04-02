interface ChatMessageProps {
  role: "user" | "model";
  content: string;
}

export function ChatMessageBubble({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 animate-fade-in`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-white text-xs font-bold shadow-sm">
          AI
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
          isUser
            ? "bg-emerald-600 text-white rounded-tr-sm"
            : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm border border-gray-100 dark:border-gray-600"
        }`}
      >
        {content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ml-2 flex-shrink-0 mt-0.5 text-gray-600 dark:text-gray-200 text-xs font-bold shadow-sm">
          You
        </div>
      )}
    </div>
  );
}
