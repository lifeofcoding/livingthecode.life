import React from "react";
import Head from "next/head";
import type { NextRouter } from "next/router";
import Navbar from "./Navbar";

type LayoutT = { children: React.ReactNode; router: NextRouter };

const Layout = ({ children, router }: LayoutT) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="QDMeds" />
        <meta name="author" content="Jimmy Rousseau" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@QDMeds" />
        <meta name="twitter:creator" content="@QDMeds" />
        <meta name="twitter:image" content="/card.png" />
        <meta property="og:site_name" content="QDMeds" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
        <title>LivingTheCode.Life &copy;</title>
      </Head>

      <Navbar path={router.asPath} />

      {children}
    </>
  );
};

export default Layout;
