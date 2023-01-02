import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    await console.log(container);
  }, []);
  return (
    <SessionProvider session={session}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
      <Particles
        id="tsparticles"
        url="/particles.json"
        init={particlesInit}
        loaded={particlesLoaded}
        className="relative z-0"
      />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
