import { type User, type Campaign } from "@prisma/client";
import Image from "next/image";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { type Participants } from "../../../types/typing";
import toast from "react-hot-toast";

interface Props {
  campaign?: Campaign | null;
  participants?: Participants[];
  setParticipants: Dispatch<SetStateAction<Participants[] | undefined>>;
  userInfo: User | null | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setDeleteCampaignModal: Dispatch<SetStateAction<boolean>>;
}

const CampaignInfo = ({
  participants,
  campaign,
  setParticipants,
  userInfo,
  loading,
  setLoading,
  setDeleteCampaignModal,
}: Props) => {
  const [participated, setParticipated] = useState<boolean>(false);
  const [executing, setExecuting] = useState<boolean>(false);

  const { mutate: participate } = trpc.user.participate.useMutation({
    onSuccess() {
      setParticipated(true);
      toast.success("成功報名參加！");
      if (!userInfo?.id) return;
      if (!userInfo?.name) return;
      setParticipants((prev) => [
        ...prev!,
        { id: userInfo?.id, name: userInfo?.name },
      ]);
      setExecuting(false);
    },
  });

  const { mutate: unparticipate } = trpc.user.unparticipate.useMutation({
    onSuccess() {
      setParticipated(false);
      toast.success("Successfully Cancelled");
      if (!userInfo?.id) return;
      if (!userInfo?.name) return;
      setParticipants((current) =>
        current?.filter((participant) => {
          return participant.name !== userInfo?.name;
        })
      );
      setExecuting(false);
    },
  });

  const handleDeleteCampaignModal = () => {
    setDeleteCampaignModal(true);
  };

  const handleUnparticipate = () => {
    setExecuting(true);
    if (!userInfo?.id) return;
    if (!campaign?.id) return;
    unparticipate({ id: userInfo?.id, campaignId: campaign?.id });
  };

  const handleParticipate = () => {
    setExecuting(true);
    if (!userInfo?.id) return;
    if (!campaign?.id) return;
    participate({ id: userInfo?.id, campaignId: campaign?.id });
  };

  useEffect(() => {
    setLoading(true);
    const participantsArray: string[] = [];
    participants?.forEach((items) => {
      if (!items.name) return;
      participantsArray.push(items.name);
    });
    if (!userInfo?.name) return;
    if (participantsArray.includes(userInfo.name)) {
      setParticipated(true);
    }
    setLoading(false);
  }, [participants, userInfo?.name, setLoading, setParticipated]);

  return (
    <div className="flex flex-col items-center justify-center py-10 lg:min-h-screen lg:pb-80 lg:pt-20">
      {campaign?.image ? (
        <div className="flex justify-center py-2 pb-10">
          <Image
            className="rounded-xl bg-white object-contain"
            height={400}
            width={400}
            src={"https://ipfs.io/ipfs/" + campaign?.image}
            alt=""
          />
        </div>
      ) : null}
      {campaign ? (
        <div className="">
          <div className="flex justify-center">
            <div className="w-3/5 rounded-2xl bg-white/60">
              <div className="space-y-2 p-3 text-center lg:p-3">
                <h1 className=" text-4xl font-bold">{campaign?.title}</h1>
                <div className="space-y-1 py-1 text-left">
                  <h2>Host：{campaign?.host}</h2>
                  <div className="flex">
                    <h2>Time：</h2>
                    <div className="flex space-x-2">
                      <h2 className="text-md text-center">
                        {campaign?.time?.toLocaleDateString()}
                      </h2>
                      <h2 className="text-md text-center">
                        {campaign?.time?.getHours()}:
                        {campaign?.time && campaign?.time?.getMinutes() < 10
                          ? "0" + campaign.time?.getMinutes()
                          : campaign?.time?.getMinutes()}
                      </h2>
                    </div>
                  </div>
                  {campaign?.place ? <h2>Place：{campaign?.place}</h2> : null}
                  {campaign?.presenter ? (
                    <h2>Presenter：{campaign?.presenter}</h2>
                  ) : null}
                  {campaign?.presentTitle ? (
                    <h2>Present Title：{campaign?.presentTitle}</h2>
                  ) : null}
                  {campaign?.description ? (
                    <h2>Description：{campaign?.description}</h2>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {loading ? null : !participated ? (
            <div className="flex justify-center pt-8">
              <motion.div
                whileTap={{
                  scale: 0.8,
                  rotate: 0,
                  borderRadius: "100%",
                }}
              >
                <button
                  onClick={handleParticipate}
                  className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-400"
                >
                  {executing ? "Applying..." : "Participate"}
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="flex justify-center pt-8">
              <motion.div
                whileTap={{
                  scale: 0.8,
                  rotate: 0,
                  borderRadius: "100%",
                }}
              >
                <button
                  onClick={handleUnparticipate}
                  className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400"
                >
                  {executing ? (
                    <div className="animate-pulse">Cancelling...</div>
                  ) : (
                    "Cancel"
                  )}
                </button>
              </motion.div>
            </div>
          )}
          {userInfo?.isAdmin ? (
            <div className="flex justify-center py-5">
              <motion.div
                whileTap={{
                  scale: 0.8,
                  rotate: 0,
                  borderRadius: "100%",
                }}
              >
                <button
                  onClick={handleDeleteCampaignModal}
                  className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-400"
                >
                  Delete Campaign
                </button>
              </motion.div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="animate-pulse text-xl font-bold text-white">
          Fetching Data...
        </div>
      )}
    </div>
  );
};

export default CampaignInfo;
