import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-semibold pt-5">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold pt-5">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold pt-5">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold pt-5">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-semibold pt-5">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-semibold pt-5">{children}</h6>
        ),
        p: ({ children }) => (
          <div className="text-base py-3 whitespace-pre-line">{children}</div>
        ),
        a: ({ children, href }) => (
          <a className="text-base text-blue-500" target="_blank" href={href}>
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="text-base list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="text-base list-decimal">{children}</ol>
        ),
        li: ({ children }) => <li className="text-base">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="text-base">{children}</blockquote>
        ),
        code: ({ children }) => (
          <div className="border border-foreground/40 bg-black/60 p-5">
            <pre className="text-base whitespace-break-spaces">{children}</pre>
          </div>
        ),
        pre: ({ children }) => <pre className="text-base">{children}</pre>,
        img: ({ children, src, alt }) => (
          <img src={src} alt={alt} width="100%" height="auto" />
        ),
        em: ({ children }) => <em className="text-base">{children}</em>,
        strong: ({ children }) => (
          <strong className="text-base">{children}</strong>
        ),
        br: ({ children }) => <div className="mb-2 w-full"></div>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
