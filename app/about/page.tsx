import { PageCirclesHero } from "@/components/PageCirclesHero";
import Image from "next/image";
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title="About Me" />

      <section className="w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[420px_minmax(0,1fr)]">
            <div>
              <Image
                className="rounded-md mt-0 ml-auto mr-auto mb-2"
                src="/me.jpeg"
                width={400}
                height={400}
                alt="LifeOfCoding -  Jimmy Rousseau"
              />
            </div>
            <div>
              My Name is Jimmy Rousseau, I first discovered the web in the last
              90s during the height of AOL 4.0, I remember, they would mail free
              trials CDs to everyone. I was obsessed with this idea of a digital
              world that connects everyone, and the concept of &quot;my
              space&quot; online. I came from a single parent home, If I wanted
              a computer for awhile I had to build it from parts.. and install a
              free linux distro online to use, also internet wasn&apos;t always
              a luxury we could afford. At first I would spend most of my days
              at the public library working on my Dragon Ball Z website, hosted
              on AngelFire and GeoCities. Later, my first exploit I discovered
              was that during AOL&apos;s sign up process, they would connect you
              online, you were unable to use their browser, but you could use a
              key combo to minimize it, and open another browser to use the
              internet. I would spend days downloading Macromedia (later Adobe)
              Dreamweaver to work on my personal Drang Ball Z website. I have
              been working on the web, with a passion since I was a kid, and
              feel very blessed to love what I do. Make sure to check me out on{" "}
              <a
                href="https://www.kaggle.com/lifeofcoding"
                target="_blank"
                className="text-primary"
              >
                Kaggle
              </a>
              ,{" "}
              <a
                href="https://huggingface.co/lifeofcoding"
                target="_blank"
                className="text-primary"
              >
                HuggingFace
              </a>
              ,{" "}
              <a
                href="https://github.com/lifeofcoding"
                className="text-primary"
              >
                Github
              </a>{" "}
              &{" "}
              <a
                href="https://linkedin.com/in/lifeofcoding"
                target="_blank"
                className="text-primary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
