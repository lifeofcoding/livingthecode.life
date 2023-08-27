import { PageCirclesHero } from "@/components/PageCirclesHero";
// import Image from "next/image";
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title="About Me" />

      <section className="w-full pb-5">
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[420px_minmax(0,1fr)]">
            <div>
              {/* <Image
                className="rounded-md mt-0 ml-auto mr-auto mb-2"
                src="/me.jpg"
                width={400}
                height={400}
                alt="LifeOfCoding -  Jimmy Rousseau"
              /> */}
              <div className="rounded-md mt-0 ml-auto mr-auto mb-2">
                <img
                  src="/me.jpg"
                  width="auto"
                  className="object-contain rounded-md mt-0 ml-auto mr-auto mb-2"
                  alt="LifeOfCoding | Jimmy Rousseau"
                />
              </div>
            </div>
            <div className="space-y-3">
              <p>
                My Name is Jimmy Rousseau, I first discovered the web in the
                last 90s during the height of AOL 4.0, I remember, they would
                mail free trials CDs to everyone. I was obsessed with this idea
                of a digital world that connects everyone, and the concept of
                &quot;my space&quot; online. I came from a single parent home,
                If I wanted a computer for awhile I had to build it from parts,
                and install a free linux distro online to use. Internet
                wasn&apos;t always a luxury we could afford. So at first I would
                spend most of my days at the public library working on my
                DragonBall Z website, hosted on AngelFire and GeoCities.
              </p>{" "}
              <p>
                Later on my Mom saved up for an eMachines Desktop computer, and
                we got AOL dialup. My first exploit I discovered was that during
                AOL&apos;s sign up process, they would connect you online, you
                were unable to use their browser, but you could use a key combo
                to minimize it, and open another browser to use the internet. I
                would spend days downloading Macromedia (later Adobe)
                Dreamweaver to work on my personal websites. At age 14 I become
                obsessed with file-sharing, and P2P program, which led me to
                develop my first desktop application, called Mastermax. Which
                was a p2p client on the gnutella network, and was based off
                gnucleus. (Same as bearshare, limewire etc..). In my early adult
                life I was self employed off my website HXCMusic.com, which was
                a mp3 downloading website. (This was still the wild, wild west
                days of the internet), with the rise of Spotify, and legal
                streaming, and DCMA takedown threats bubbling up, I decided to
                close the website, and move on with my skillset to become a web
                developer.{" "}
              </p>
              <p>
                {" "}
                My First job as a web developer was for United Way, in a
                AmeriCorps VISTA position to work on the online presence, and
                ability to have our services online at our Palatka Florida,
                United Way. After this, I worked for Apply Networks, where we
                made managment software for many of the schools in Florida. It
                was for managing student grades, classes, and teachers,
                papework, and the other administration tasks for teachers. After
                this I worked for a EMR Start-up making software for electronic
                health medical records, e-prescribing, patient managment and
                more.After working here for a couple of years, I started at
                Mobiquity Inc. Which is a dev shop, building out enterprise
                scale applications for fortune 500 companies. There I started as
                a junor, and worked my way up to mid, to even being lead on many
                projects.
              </p>
              <p>
                Some of the project highlights I worked on when I was at
                Mobiquity was a Hybrid Mobile App for the Dermatology Department
                of The Children&apos;s Hospital of Philidelphia. The goal was to
                lessen their large wait times for patients by developing an
                application to take pictures of skin conditions to have
                diagnosed digitally by a physician. I also got to be lead
                developing the frontend website of LocalNow.com for the initial
                release of the new streaming service by The Weather Channel,
                which also had a Roku, and FireTV application developed by
                Mobiquity. Finally towards the end I got to be on a project for
                Nestle, for their applications called Nestle Goodness, our
                company was also developing an alexa skill to be paired with the
                application my team was working on, which was a hybrid ios app
                to work along side the Alexa.
              </p>
              <p>
                Currently I am living in beautiful St. Augustine, Florida
                working remote as a Lead Full Stack Software Engineer for a
                company based out of Austin, Texas called DHXGroup. Where I am
                using modern fullstack technologies, and artificial intelligence
                to build out user friendly, feature rich services in the
                healthcare space.
              </p>
              <p>
                I have been working on the web, with a passion since I was a
                kid, and feel very blessed to love what I do. Make sure to check
                me out on{" "}
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
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
