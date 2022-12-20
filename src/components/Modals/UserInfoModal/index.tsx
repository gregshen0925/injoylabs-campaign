import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Image from "next/image";
import { type User } from "@prisma/client";

type Props = {
  setWalletInfoModalOn: Dispatch<SetStateAction<boolean>>;
  avatar: string | null | undefined;
  userInfo: User | null | undefined;
};

const UserInfoModal = ({ setWalletInfoModalOn, avatar, userInfo }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const { account, disconnect } = useWallet();
  const clickOutsidehandler = () => {
    setWalletInfoModalOn(false);
  };
  const handleDisconnect = () => {
    disconnect();
    setWalletInfoModalOn(false);
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(account?.address?.toString() || "");
    setCopied(true);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="h-modal fixed z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 backdrop-blur-sm md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative overflow-y-scroll rounded-2xl bg-black/70 shadow"
        >
          <button
            onClick={() => setWalletInfoModalOn(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200  hover:text-gray-900 "
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="rounded-t border-b border-gray-800 py-4  px-6">
            <div className="flex justify-center p-5">
              {userInfo?.image ? (
                <Image
                  className="rounded-full bg-white object-contain"
                  height={100}
                  width={100}
                  src={userInfo.image}
                  alt=""
                />
              ) : null}
            </div>
            <div className="flex flex-col items-center space-y-5">
              {/* <h3 className="text-center text-base font-semibold text-gray-900  text-white lg:text-2xl">
                {username}
              </h3> */}
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                {copied ? (
                  <button
                    className="font-bold text-white"
                    onClick={() => setCopied(false)}
                  >
                    ✅ Copied
                  </button>
                ) : (
                  <div>
                    <button onClick={handleCopyText} className="cursor-pointer">
                      <h3 className="text-center text-base font-semibold text-white lg:text-xl">
                        {account?.address?.toString().substring(0, 5) +
                          "..." +
                          account?.address
                            ?.toString()
                            .substring(
                              account?.address?.toString().length - 5,
                              account?.address?.toString().length
                            )}
                      </h3>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          <div className="pt-3 text-center text-white">
            {userInfo?.description}
          </div>

          <div className="flex justify-center space-x-2 p-6">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
            >
              <button
                onClick={handleDisconnect}
                className="cursor-pointer rounded-lg bg-gray-600 px-2 py-2 text-sm font-bold text-white hover:bg-gray-500"
              >
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
