"use client";

import { useChat } from "ai/react";
import { trpc } from "@/app/_trpc/client";

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

  return (
    <main className="mx-auto w-full h-screen max-w-lg p-24 flex flex-col">
      <section className="mb-auto m">
        {messages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button
          className="border-solid border-2 border-white p-2 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </main>
  );
}
