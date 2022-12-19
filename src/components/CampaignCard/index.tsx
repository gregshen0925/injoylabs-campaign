import { type Campaign } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  campaign: Campaign;
};

const CollectionCard = ({ campaign }: Props) => {
  return (
    <Link href={`/campaign/${campaign.title}`}>
      <div className="rounded-2xl bg-black/40">
        <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
          {campaign.image ? (
            <div className="rounded-xl p-3 md:p-5">
              <Image
                className="rounded-2xl object-cover"
                src={"https://ipfs.io/ipfs/" + campaign?.image}
                height={300}
                width={300}
                alt=""
              />
            </div>
          ) : null}
          <div className="space-y-3 p-5">
            <h2 className="text-center text-xl font-semibold text-white md:text-3xl">
              {campaign.title}
            </h2>
            <div className="flex justify-center space-x-2">
              <h2 className="text-md text-center font-semibold text-white">
                {campaign.time?.toLocaleDateString()}
              </h2>
              <h2 className="text-md text-center font-semibold text-white">
                {campaign.time?.getHours()}:
                {campaign.time && campaign.time?.getMinutes() < 10
                  ? "0" + campaign.time?.getMinutes()
                  : campaign.time?.getMinutes()}
              </h2>
            </div>
            <p className="mt-2 mb-8 text-center text-sm font-semibold text-white">
              {campaign.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
