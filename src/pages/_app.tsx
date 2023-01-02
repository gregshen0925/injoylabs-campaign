import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { AptosWalletProvider } from "../context/AptosWalletProvider";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const toastOptions = {
  style: {
    background: "rgb(0, 0, 0)",
    color: "white",
  },
  success: {
    className: "border border-green-500",
    iconTheme: {
      primary: "#10B981",
      secondary: "white",
    },
  },
  error: {
    className: "border border-red-500",
    iconTheme: {
      primary: "#EF4444",
      secondary: "white",
    },
  },
  loading: { className: "border border-yello-300" },
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <AptosWalletProvider>
      <Toaster position="top-center" toastOptions={toastOptions} />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 0.75 }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0,100% 0,100% 100%, 0% 100%",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(0 0,100% 0,100% 100%, 0% 100%",
            },
            exitState: {
              clipPath: "polygon(50% 0,50% 0,50% 100%, 50% 100%",
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </AptosWalletProvider>
  );
};

export default trpc.withTRPC(MyApp);
