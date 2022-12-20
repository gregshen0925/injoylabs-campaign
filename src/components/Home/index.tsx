import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Hero from "../Hero";
import Navbar from "../Navbar";
import Campaigns from "../Campaigns";
import { trpc } from "../../utils/trpc";
import InviteModal from "../Modals/InviteModal";
import { type Campaign } from "@prisma/client";
import ConnectModal from "../Modals/ConnectModal";
import UserInfoModal from "../Modals/UserInfoModal";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import RegisterModal from "../Modals/RegisterModal";
import AddCampaignModal from "../Modals/AddCampaignModal";
import useCheckUserStatus from "../../hooks/useCheckUserStatus";

const Home: NextPage = () => {
  const [userInfoModal, setUserInfoModal] = useState<boolean>(false);
  const [addCampaignModal, setAddCampaignModal] = useState<boolean>(false);
  const [inviteModalOn, setInviteModalOn] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [walletInfoModalOn, setWalletInfoModalOn] = useState<boolean>(false);
  const [registerModalOn, setRegisterModalOn] = useState<boolean>(false);
  const { account } = useWallet();
  const { userName, avatar, setUserName } = useCheckUserStatus();

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
        <link rel="icon" href="/injoylabslogo.png" />
      </Head>
      <Navbar
        setUserInfoModal={setUserInfoModal}
        userInfoModal={userInfoModal}
        userInfo={userInfo}
        setAddCampaignModal={setAddCampaignModal}
        setInviteModalOn={setInviteModalOn}
      />
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {walletInfoModalOn ? (
        <UserInfoModal
          setWalletInfoModalOn={setWalletInfoModalOn}
          avatar={avatar}
          userInfo={userInfo}
        />
      ) : null}
      {registerModalOn ? (
        <RegisterModal
          setUserName={setUserName}
          setRegisterModalOn={setRegisterModalOn}
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

      <Hero
        userName={userName}
        setUserName={setUserName}
        userInfo={userInfo}
        setConnectModalOn={setConnectModalOn}
        setWalletInfoModalOn={setWalletInfoModalOn}
        setRegisterModalOn={setRegisterModalOn}
      />
      {userInfo?.approved ? (
        <section id="campaigns" className="snap-center">
          <Campaigns campaigns={campaigns} />
        </section>
      ) : null}
    </>
  );
};

export default Home;
