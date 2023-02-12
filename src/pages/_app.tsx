import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { AnimatePresence } from "framer-motion";
import type { Container, Engine } from "tsparticles-engine";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider } from "../store/store";

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
      <Provider>
        {/* <div className="bg-hot-purple"> */}
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0 });
                // document?.querySelector("#page-viewport")?.scrollTo({ top: 0 });
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
        {/* </div> */}
        <Particles
          id="tsparticles"
          url="/particles.json"
          init={particlesInit}
          loaded={particlesLoaded}
          className="relative z-[-1]"
        />
      </Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
