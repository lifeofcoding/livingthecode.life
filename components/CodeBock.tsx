"use client";
import { useRef, ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
/*
  Themes: 
  a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold,
  coldarkDark, coy, darcula, dark, dracula,
  duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea,
  duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight,
  hopscotch, materialDark, materialLight, materialOceanic, nord,
  okaidia, oneDark, oneLight, pojoaque, prism,
  shadesOfPurple, solarizedlight, synthwave84, tomorrow, twilight,
  vs, vscDarkPlus, xonokai.
*/
import {
  base16AteliersulphurpoolLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

export function CodeBlock({
  children,
  className,
  inline,
}: {
  children: ReactNode;
  className?: string;
  inline?: boolean;
}) {
  const { theme } = useTheme();
  const match = /language-(\w+)/.exec(className || "");
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
        {!inline && match ? (
          <SyntaxHighlighter
            // children={String(children).replace(/\n$/, "")}
            style={theme === "dark" ? atomDark : base16AteliersulphurpoolLight}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          children
        )}
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
