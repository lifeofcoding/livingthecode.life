import { Articles } from "./Articles";
import { Categories } from "../Categories";
export default async function Page({ params }: { params: { slug: string[] } }) {
  const [category, article] = params.slug;

  if (category == "new") {
    return <Categories />;
  }

  if (!article) {
    return <Articles category={category} />;
  }

  if (article == "new") {
    return <Articles category={category} />;
  } else {
    return <Articles category={category} />;
  }
}
