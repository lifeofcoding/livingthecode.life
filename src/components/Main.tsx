import Head from "next/head";

type MainT = {
  children: React.ReactNode;
  title: string;
};
const Main = ({ children, title = "" }: MainT) => {
  return (
    <>
      <Head>
        <title>
          LivingTheCode.Life | LifeOfCoding (Jimmy Rousseau) | {title}
        </title>
        <meta
          name="description"
          content="LivingTheCode.life Jimmy Rousseau software engineer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Main;
