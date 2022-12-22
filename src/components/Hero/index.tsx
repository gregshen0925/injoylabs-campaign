import React, { type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { type User } from "@prisma/client";
import ConnectButton from "../Buttons/ConnectButton";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import RegisterButton from "../Buttons/RegisterButton";

type Props = {
  userName: string | null | undefined;
  setUserName: Dispatch<SetStateAction<string | null | undefined>>;
  userInfo: User | null | undefined;
  setConnectModalOn: Dispatch<SetStateAction<boolean>>;
  setWalletInfoModalOn: Dispatch<SetStateAction<boolean>>;
  setRegisterModalOn: Dispatch<SetStateAction<boolean>>;
};

const Hero = ({
  // userName,
  // setUserName,
  userInfo,
  setConnectModalOn,
  setWalletInfoModalOn,
  setRegisterModalOn,
}: Props) => {
  const { account } = useWallet();
  // useEffect(() => {
  //   if (!userInfo?.name) return;
  //   setUserName(userInfo?.name);
  // }, [setUserName, userInfo?.name]);

  const haveToken = 1;

  return (
    <div>
      <div className="custom-img6 flex h-screen items-center justify-center bg-cover bg-fixed bg-center">
        <div className="absolute top-0 bottom-0 left-0 right-0 z-[2] h-screen bg-black/20" />

        <div className="z-[2] mt-[10rem] p-5 text-white sm:ml-[-10rem] sm:mt-[10rem] md:ml-[-20rem] lg:ml-[-30rem] xl:ml-[-40rem] 2xl:ml-[-50rem]">
          <div className="text-4xl font-bold sm:text-5xl">
            {account?.address ? (
              haveToken ? (
                userInfo ? (
                  userInfo?.approved ? (
                    `Welcome! ${
                      // account.address?.toString().substring(0, 5) +
                      // "..." +
                      // account?.address
                      //   ?.toString()
                      //   .substring(
                      //     account?.address?.toString().length - 5,
                      //     account?.address?.toString().length
                      //   )
                      userInfo?.name
                    }`
                  ) : (
                    "Not Member"
                  )
                ) : (
                  <RegisterButton setRegisterModalOn={setRegisterModalOn} />
                )
              ) : (
                "Not Member"
              )
            ) : (
              "Hello! Login First!"
            )}
          </div>
          <div className="flex items-center space-x-3 py-5 text-xl">
            {userInfo ? (
              <Link href="#campaigns">
                <button className="h-[60px] rounded-2xl bg-white/20 px-5 py-3 font-semibold text-white no-underline transition hover:bg-white/30">
                  Campaigns
                </button>
              </Link>
            ) : null}
            <ConnectButton
              setConnectModalOn={setConnectModalOn}
              setWalletInfoModalOn={setWalletInfoModalOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
