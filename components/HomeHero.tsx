export function HomeHero({ title }: { title: string }) {
  return (
    <div className="relative pb-20 mt-20 w-full max-w-xl ml-auto mr-auto">
      <div className="flex flex-row w-full h-full items-stretch content-stretch blur-md">
        <div className="w-[33.3%] relative">
          <div className="rounded-full w-full aspect-square bg-gradient-to-b from-red-600 to-pink-400 z-[-1] left-ball"></div>
        </div>
        <div className="w-[33.3%] relative">
          <div className="rounded-full w-full aspect-square bg-gradient-to-b from-blue-500 to-purple-600 z-0 middle-ball"></div>
        </div>
        <div className="w-[33.3%] relative">
          <div className="rounded-full w-full  aspect-square bg-gradient-to-b from-purple-600 to-pink-600 z-0 right-ball"></div>
        </div>
      </div>
      <div className="absolute inset-0 z-2 flex justify-center items-center">
        <div className="text-center lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          {title}
        </div>
      </div>
    </div>
  );
}
