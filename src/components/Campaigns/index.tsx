import React, { type LegacyRef } from "react";
import { motion } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import { type Campaign } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  campaigns: Campaign[] | undefined;
};
const Campaigns = ({ campaigns }: Props) => {
  const [parent] = useAutoAnimate();
  return (
    <div className="custom-img2 z-[-2] flex min-h-screen items-center justify-center bg-cover bg-fixed bg-center">
      {/* <div className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-b from-[#7fadd9] to-[#0889f3] "> */}
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-16 md:grid-cols-3 lg:grid-cols-4"
          ref={parent as LegacyRef<HTMLDivElement> | undefined}
        >
          {campaigns ? (
            campaigns
              ?.sort((a, b) =>
                a.time
                  ?.toLocaleDateString()
                  .localeCompare(b.time?.toLocaleDateString())
              )
              ?.map((campaign, i) => (
                <motion.div
                  whileTap={{
                    scale: 0.8,
                    rotate: 0,
                    borderRadius: "100%",
                  }}
                  key={i}
                  className="py-4"
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))
          ) : (
            <div className="text-center text-xl font-bold text-white">
              取得資料中...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
