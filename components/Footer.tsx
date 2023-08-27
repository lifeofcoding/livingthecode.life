// import { GithubIcon, TwitterIcon } from "lucide-react";
// import { Kaggle } from "@components/icons/kaggle";
// import { HuggingFace } from "./icons/huggingface";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="supports-backdrop-blur:bg-background/60 w-full border-t bg-background/95 backdrop-blur">
      <div className="container p-1 flex h-14 items-center justify-between flex-col md:flex-row gap-1">
        <div className="hidden md:block text-sm">
          Created By{" "}
          <Link href="/about" className="transition-colors hover:text-primary">
            LifeOfCoding
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col md:flex-row gap-1">
          <div className="text-md pr-1">Find me on:</div>
          <div className="flex flex-rows gap-1 items-center justify-center">
            <div>
              <a
                href="https://twitter.com/lifeofcoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <TwitterIcon /> */}
                <button className="bg-background border p-1 transition-colors text-sm rounded hover:bg-primary">
                  Twitter
                </button>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/lifeofcoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <GithubIcon /> */}
                <button className="bg-background border p-1 transition-colors text-sm rounded hover:bg-primary">
                  Github
                </button>
              </a>
            </div>
            <div>
              <a
                href="https://www.kaggle.com/lifeofcoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Kaggle /> */}
                <button className="bg-background border p-1 transition-colors text-sm rounded hover:bg-primary">
                  Kaggle
                </button>
              </a>
            </div>
            <div>
              <a
                href="https://huggingface.co/LifeOfCoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <HuggingFace /> */}
                <button className="bg-background border p-1 transition-colors text-sm rounded hover:bg-primary">
                  HuggingFace
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
