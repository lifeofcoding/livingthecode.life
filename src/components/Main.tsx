import Head from "next/head";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useStore } from "../store/store";

type MainT = {
  children: React.ReactNode;
  title: string;
};

const variants = {
  hiddenLeft: { opacity: 0, x: -150, y: 0 },
  hiddenRight: { opacity: 0, x: 150, y: 0 },
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
  exitLeft: { opacity: 0, x: -50, y: 0 },
  exitRight: { opacity: 0, x: 50, y: 0 },
};

const Main = ({ children, title = "" }: MainT) => {
  const [direction] = useStore((store) => store.direction);

  const hiddenVarient = useMemo(() => {
    let hidden = "hidden";

    if (direction === "left") {
      hidden = "hiddenLeft";
    }

    if (direction === "right") {
      hidden = "hiddenRight";
    }

    return hidden;
  }, [direction]);

  return (
    <>
      <Head>
        <title>
          LivingTheCode.Life | Jimmy Rousseau (LifeOfCoding) | Software Engineer
          |
        </title>
        <meta
          name="description"
          content="LivingTheCode.Life | Jimmy Rousseau (LifeOfCoding) | Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.article
        initial={hiddenVarient}
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.25, type: "easeInOut" }}
      >
        {children}
      </motion.article>
    </>
  );
};

export default Main;
