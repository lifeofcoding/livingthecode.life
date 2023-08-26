import ReactMarkdown from "react-markdown";
import { cn } from "./utils";
import { CodeBlock } from "@components/CodeBock";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ className, ...props }) => (
          <h1
            className={cn(
              "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
              className
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
              className
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
              className
            )}
            {...props}
          />
        ),
        h4: ({ className, ...props }) => (
          <h4
            className={cn(
              "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
              className
            )}
            {...props}
          />
        ),
        h5: ({ className, ...props }) => (
          <h5
            className={cn(
              "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
              className
            )}
            {...props}
          />
        ),
        h6: ({ className, ...props }) => (
          <h6
            className={cn(
              "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
              className
            )}
            {...props}
          />
        ),
        p: ({ className, ...props }) => (
          <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
          />
        ),
        a: ({ className, ...props }) => (
          <a
            className={cn(
              "font-medium underline underline-offset-4",
              className
            )}
            target="_blank"
            {...props}
          />
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
        code: ({ children, inline, className }) => (
          <CodeBlock inline={inline} className={className}>
            {children}
          </CodeBlock>
        ),
        // code: ({ className, ...props }) => (
        //   <code
        //     className={cn(
        //       "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        //       className
        //     )}
        //     {...props}
        //   />
        // ),
        pre: ({ children }) => <pre className="text-base">{children}</pre>,
        img: ({
          className,
          alt,
          ...props
        }: React.ImgHTMLAttributes<HTMLImageElement>) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={cn("rounded-md border", className)}
            alt={alt}
            {...props}
          />
        ),
        em: ({ children }) => <em className="text-base">{children}</em>,
        strong: ({ children }) => (
          <strong className="text-base">{children}</strong>
        ),
        br: ({ children }) => <div className="mb-2 w-full"></div>,
        hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
        table: ({
          className,
          ...props
        }: React.HTMLAttributes<HTMLTableElement>) => (
          <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
          </div>
        ),
        tr: ({
          className,
          ...props
        }: React.HTMLAttributes<HTMLTableRowElement>) => (
          <tr
            className={cn("m-0 border-t p-0 even:bg-muted", className)}
            {...props}
          />
        ),
        th: ({ className, ...props }) => (
          <th
            className={cn(
              "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
              className
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={cn(
              "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
              className
            )}
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
