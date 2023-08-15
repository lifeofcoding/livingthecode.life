import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-semibold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mb-2">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-semibold mb-2">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-semibold mb-2">{children}</h6>
        ),
        p: ({ children }) => <p className="text-base py-3">{children}</p>,
        a: ({ children, href }) => (
          <a className="text-base text-blue-500" href={href}>
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
        code: ({ children }) => <code className="text-base">{children}</code>,
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
