import { Categories } from "./Categories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  return <Categories />;
}
