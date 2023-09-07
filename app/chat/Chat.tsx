"use client";

import { useChat } from "ai/react";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BackgroundCircles } from "@/components/BackgroundCircles";

export default function Chat({ initialToken }: { initialToken: string }) {
  const { data: token } = trpc.getChatToken.useQuery(undefined, {
    initialData: initialToken,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 4, // 4 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
  const [isResponding, setIsResponding] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "https://h5ny25amezrm3c3ggta5ntzbbe0hxolj.lambda-url.us-east-2.on.aws/",
      headers: {
        authorization: token,
      },
      onResponse: (res) => {
        setIsResponding(true);
      },
      onFinish: (message) => {
        setIsResponding(false);
      },
    });

  useEffect(() => {
    if (messages.length === 0) return;
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  const variants: AnimationProps["variants"] = {
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        // delay: i * 0.3,
        duration: 0.5,
        type: "spring",
      },
    }),
    hidden: { opacity: 0, scale: 0.8, y: 15 },
  };

  return (
    <main className="mx-auto w-full container flex flex-col">
      {/* <ScrollArea className="mb-auto flex flex-col justify-end flex-grow max-h-[80vh]"> */}
      <div className="mb-auto  flex-grow flex items-end w-full">
        <section className="flex flex-col justify-end flex-grow">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={"hidden"}
                exit={"hidden"}
                animate={"visible"}
                variants={variants}
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
            {isLoading && !isResponding ? (
              <motion.div
                key={isLoading ? "loading" : "input"}
                initial={"hidden"}
                exit={"hidden"}
                animate={"visible"}
                variants={variants}
                className="self-start"
              >
                <div className={cn("flex rounded border p-3")}>
                  <Skeleton className="w-60 h-8" />
                </div>
              </motion.div>
            ) : null}
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

      <div className="w-full fixed bottom-0 h-full z-[-1]">
        <BackgroundCircles />
      </div>
    </main>
  );
}
