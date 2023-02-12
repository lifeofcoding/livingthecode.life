import { type NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Main";

const About: NextPage = () => {
  return (
    <Layout title="About">
      <main className="relative z-10 flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <div className="flex w-full justify-between">
            <div>
              <h1 className="w-full text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                About
              </h1>
            </div>
            <div>
              <div className="relative mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/jimmy.jpeg"
                  alt="Jimmy Rousseau | LifeOfCoding"
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>

          <div className="w-3/4">
            <div className="text-white">
              My Name is Jimmy Rousseau, and I been developing the web since the
              90s. I have a passion for clean code, and building rich features
              and functionality using the latest technology. I have worked for
              large development companies, to small start ups building complex
              web applications with the latest web standards, and built to
              scale. I have a passion for the field, and always looking out for
              the latest technology trends. Currently I am working as lead
              software engineer for a start up company in the healthcare space.
              In my free time I like to play with new programming langauges,
              javascript frameworks & libraries, learn blockchain development &
              machine learning. I live in beautilful St Augustine, Florida.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
