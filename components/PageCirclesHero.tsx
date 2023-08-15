import { BackgroundCircles } from "./BackgroundCircles";
export function PageCirclesHero({ title }: { title: string }) {
  return (
    <div className="w-full relative min-h-[300px] flex flex-col justify-center mt-5">
      <div className="flex min-w-max p-5 text-4xl font-semibold justify-center">
        {title}
      </div>
      <BackgroundCircles />
    </div>
  );
}
