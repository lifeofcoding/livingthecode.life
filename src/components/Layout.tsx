import React, { useEffect, useRef } from "react";
import Head from "next/head";
import type { NextRouter } from "next/router";
import Navbar from "./Navbar";
import { useStore } from "../store/store";

type LayoutT = { children: React.ReactNode; router: NextRouter };

const sliderPages = ["/", "/projects", "/about"];

const getPageIndex = (route: string) => {
  if (sliderPages.includes(route)) {
    return sliderPages.indexOf(route);
  }

  return sliderPages.length + 1;
};

const Layout = ({ children, router }: LayoutT) => {
  const previousPageRef = useRef<string>(router.route);
  const [, setStore] = useStore((store) => store.direction);
  useEffect(() => {
    if (router.route !== previousPageRef.current) {
      const prevIndex = getPageIndex(previousPageRef.current);
      const currentIndex = getPageIndex(router.route);
      previousPageRef.current = router.route;

      let direction = "";

      if (currentIndex < sliderPages.length && prevIndex < currentIndex) {
        direction = "right";
      }

      if (currentIndex < sliderPages.length && prevIndex > currentIndex) {
        direction = "left";
      }

      console.log("direction", direction);
      setStore({ direction });
    }
  }, [router.route, setStore]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="LivingTheCode.Life | Jimmy Rousseau (LifeOfCoding) | Software Engineer"
        />
        <meta name="author" content="Jimmy Rousseau" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@QDMeds" />
        <meta name="twitter:creator" content="@QDMeds" />
        <meta name="twitter:image" content="/card.png" />
        <meta
          property="og:site_name"
          content="LivingTheCode.Life | Jimmy Rousseau (LifeOfCoding) | Software Engineer"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
        <title>
          LivingTheCode.Life | Jimmy Rousseau (LifeOfCoding) | Software Engineer
          &copy;
        </title>
      </Head>

      <Navbar path={router.asPath} />

      {children}
    </>
  );
};

export default Layout;
