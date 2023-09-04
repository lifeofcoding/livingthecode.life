import { serverClient } from "@/app/_trpc/serverClient";
import Chat from "./Chat";

export default async function Page() {
  const token = await serverClient.getChatToken();

  return (
    <div>
      <Chat initialToken={token} />
    </div>
  );
}
