export function PageHero({ title }: { title: string }) {
  return (
    <div className="relative min-h-[300px] w-full flex flex-col justify-center mt-5">
      <div className="page-bg-gradient absolute small z-[-1]"></div>
      <div className="flex min-w-max p-5 text-4xl font-semibold justify-center">
        {title}
      </div>
    </div>
  );
}
