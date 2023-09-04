"use client";

import { useChat } from "ai/react";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function Chat({ initialToken }: { initialToken: string }) {
  const { data: token } = trpc.getChatToken.useQuery(undefined, {
    initialData: initialToken,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 10000,
  });
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "https://h5ny25amezrm3c3ggta5ntzbbe0hxolj.lambda-url.us-east-2.on.aws/",
      headers: {
        authorization: token,
      },
    });

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="mx-auto w-full container flex flex-col">
      {/* <ScrollArea className="mb-auto flex flex-col justify-end flex-grow max-h-[80vh]"> */}
      <div className="mb-auto  flex-grow flex items-end w-full">
        <section className="flex flex-col justify-end flex-grow">
          <AnimatePresence>
            {messages.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.3,
                  // delay: idx * 0.1,
                }}
                className={cn(
                  "mb-4",
                  m.role === "user" ? "self-end" : "self-start"
                )}
              >
                <div
                  className={cn(
                    "flex rounded border p-3",
                    m.role === "user"
                      ? "bg-primary"
                      : "bg-background whitespace-break-spaces"
                  )}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>
      {/* </ScrollArea> */}
      <form
        className="flex space-x-4 mb-3 py-3 sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent"
        onSubmit={handleSubmit}
      >
        <Input
          className="flex-grow"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </main>
  );
}
