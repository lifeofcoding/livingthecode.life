"use client";
import { useRef, ReactNode } from "react";
export function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const copyText = () => {
    if (!ref.current) return;
    const text = ref.current.innerText;
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="relative group">
      <div
        className="border rounded bg-white/60 dark:bg-black/60 p-5 font-mono text-sm whitespace-break-spaces"
        ref={ref}
      >
        {children}
      </div>
      <div className="hidden group-hover:block absolute right-1 top-2">
        <button
          className="bg-primary p-2 rounded text-sm text-black dark:text-white"
          onClick={copyText}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
