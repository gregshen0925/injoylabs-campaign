import React, { type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { targetNetwork } from "../../../constants";

type Props = {
  setConnectModalOn: Dispatch<SetStateAction<boolean>>;
  setWalletInfoModalOn: Dispatch<SetStateAction<boolean>>;
};

const ConnectButton = ({ setConnectModalOn, setWalletInfoModalOn }: Props) => {
  const { connected, network } = useWallet();
  return (
    <motion.div
      whileTap={{
        scale: 0.8,
        borderRadius: "100%",
      }}
    >
      <div className="button-container-1">
        <span className="mas">
          <div
            className={`animate-pulse ${connected ? null : "mt-[-13px]"}`}
          >{`${
            connected
              ? network?.name?.toString().toLowerCase() == targetNetwork ||
                "Aptos testnet"
                ? "User Info"
                : "Wrong Network"
              : "Connect Wallet"
          }`}</div>
        </span>
        <button
          onClick={() =>
            connected ? setWalletInfoModalOn(true) : setConnectModalOn(true)
          }
          type="button"
          // className="rounded-2xl bg-black/30 px-5 py-3 font-semibold text-white no-underline transition hover:bg-black/50"
        >
          <div className={`${connected ? null : "animate-pulse"}`}>
            {`${
              connected
                ? network?.name?.toString().toLowerCase() == targetNetwork ||
                  "Aptos testnet"
                  ? "User Info"
                  : "Wrong Network"
                : "Connect Wallet"
            }`}
          </div>
        </button>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default ConnectButton;
