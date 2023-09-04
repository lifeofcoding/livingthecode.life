import { cn } from "@lib/utils";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className={cn(
        "bg-background/70",
        "border-r",
        "hover:bg-background/90",
        "md:hover:bg-transparent",
        "md:bg-transparent",
        "fixed",
        "top-14",
        "z-30",
        "ml-2",
        "max-w-[220px]",
        "translate-x-[-102%]",
        "hover:translate-x-[calc(-1*2rem)]",
        "md:hover:translate-x-0",
        "transition-transform",
        "md:translate-x-0",
        "h-[calc(100vh-3.5rem)]",
        "w-full",
        "shrink-0",
        "md:sticky",
        "md:block",
        "after:content-['>>']",
        "md:after:hidden",
        "after:absolute",
        "after:top-[30vh]",
        "after:right-0",
        "after:rounded-full",
        "after:h-10",
        "after:w-10",
        "after:flex",
        "after:justify-center",
        "after:items-center"
      )}
    >
      {children}
    </aside>
  );
}
