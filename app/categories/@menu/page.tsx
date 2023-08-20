import { Categories } from "./Categories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  // For testing loading states
  // const sleep = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // await sleep(3000);
  return <Categories />;
}
