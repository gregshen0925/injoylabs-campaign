import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Hero from "../Hero";
import Navbar from "../Navbar";
import Campaigns from "../Campaigns";
import UserInfoModal from "../Modals/UserInfoModal";
import { trpc } from "../../utils/trpc";
import InviteModal from "../InviteModal";
import { type Campaign } from "@prisma/client";
import ConnectModal from "../Modals/ConnectModal";
import WalletInfoModal from "../Modals/WalletInfoModal";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import RegisterModal from "../Modals/RegisterModal";
import AddCampaignModal from "../Modals/AddCampaignModal";

const Home: NextPage = () => {
  const [userInfoModal, setUserInfoModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>();
  const [addCampaignModal, setAddCampaignModal] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [walletInfoModalOn, setWalletInfoModalOn] = useState<boolean>(false);
  const [registerModalOn, setRegisterModalOn] = useState<boolean>(false);
  const {
    account,
    // connecting,
    // disconnect,
    // wallet: currentWallet,
  } = useWallet();

  const { data: userInfo } = trpc.user.getUserInfo.useQuery(
    { address: account?.address?.toString() || "" },
    {
      enabled: account?.address !== undefined,
    }
  );

  const { data: campaignObjects } = trpc.campaign.getAll.useQuery(undefined, {
    enabled: userInfo?.approved !== false,
  });

  useEffect(() => {
    if (userInfo?.approved == false) return;
    if (!campaignObjects) return;
    setCampaigns(campaignObjects);
  }, [setCampaigns, campaignObjects, userInfo?.approved]);

  return (
    <>
      <Head>
        <title>InJoy Labs Campaign</title>
        <meta name="description" content="Created by InJoy Labs" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <Navbar
        setUserInfoModal={setUserInfoModal}
        userInfoModal={userInfoModal}
        userInfo={userInfo}
        setAddCampaignModal={setAddCampaignModal}
        setInviteModalOn={setInviteModalOn}
      />
      <Hero
        userName={userName}
        setUserName={setUserName}
        userInfo={userInfo}
        setConnectModalOn={setConnectModalOn}
        setWalletInfoModalOn={setWalletInfoModalOn}
        setRegisterModalOn={setRegisterModalOn}
      />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {walletInfoModalOn ? (
        <WalletInfoModal setWalletInfoModalOn={setWalletInfoModalOn} />
      ) : null}
      {registerModalOn ? (
        <RegisterModal
          setUserName={setUserName}
          setRegisterModalOn={setRegisterModalOn}
        />
      ) : null}
      {userInfoModal ? (
        <UserInfoModal
          setUserInfoModal={setUserInfoModal}
          setUserName={setUserName}
          userInfo={userInfo}
          userName={userName}
        />
      ) : null}
      {addCampaignModal ? (
        <AddCampaignModal
          setAddCampaignModal={setAddCampaignModal}
          setCampaigns={setCampaigns}
          userInfo={userInfo}
        />
      ) : null}
      {inviteModalOn ? (
        <InviteModal setInviteModalOn={setInviteModalOn} />
      ) : null}
      {userInfo?.approved ? (
        <section id="campaigns" className="snap-center">
          <Campaigns campaigns={campaigns} />
        </section>
      ) : null}
    </>
  );
};

export default Home;
