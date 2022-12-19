import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import CampaignInfo from "../../components/CampaignInfo";
import ParticipateInfo from "../../components/ParticipateInfo";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import DeleteCampaignModal from "../../components/Modals/DeleteCampaignModal";
import { type Participants } from "../../../types/typing";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

const CampainPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const title = typeof id === "string" ? id : "/";
  const [participants, setParticipants] = useState<Participants[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { account } = useWallet();
  const [deleteCampaignModal, setDeleteCampaignModal] =
    useState<boolean>(false);

  const { data: campaign } = trpc.campaign.getOne.useQuery({ title: title });

  const { data: userInfo } = trpc.user.getUserInfo.useQuery(
    { address: account?.address?.toString() || "" },
    {
      enabled: account?.address?.toString() !== undefined,
    }
  );

  trpc.campaign.getParticipants.useQuery(
    {
      id: campaign?.id || "",
    },
    {
      onSuccess: (data) => {
        setParticipants(data[0]?.participants);
        setLoading(false);
      },
    }
  );

  return (
    <div className="custom-img3 z-[-2] flex min-h-screen flex-col overflow-y-scroll bg-cover bg-fixed bg-center lg:grid lg:grid-cols-10">
      <div className="absolute top-0 bottom-0 left-0 right-0 h-screen bg-black/20" />

      <Head>
        <title>{campaign?.title}</title>
        <meta name="description" content={`Title：${campaign?.title}`} />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>

      <Toaster position="bottom-center" />

      {deleteCampaignModal ? (
        <DeleteCampaignModal
          setDeleteCampaignModal={setDeleteCampaignModal}
          campaign={campaign}
        />
      ) : null}

      {/* Left */}
      <div className="z-[1] pr-5 pl-5 lg:col-span-4">
        <CampaignInfo
          campaign={campaign}
          participants={participants}
          setParticipants={setParticipants}
          userInfo={userInfo}
          loading={loading}
          setLoading={setLoading}
          setDeleteCampaignModal={setDeleteCampaignModal}
        />
      </div>

      {/* Right */}
      <div className="z-[1] flex flex-1 flex-col py-5 px-12 sm:py-20 lg:col-span-6">
        <ParticipateInfo participants={participants} loading={loading} />
      </div>
    </div>
  );
};

export default CampainPage;
