import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { trpc } from "../../../utils/trpc";
import { type Campaign } from "@prisma/client";

type Props = {
  setDeleteCampaignModal: Dispatch<SetStateAction<boolean>>;
  campaign?: Campaign | null;
};

const DeleteCampaignModal = ({ setDeleteCampaignModal, campaign }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setDeleteCampaignModal(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const { mutate: deleteCampaign } = trpc.campaign.delete.useMutation({
    onSuccess() {
      setLoading(false);
    },
  });

  const handleDeleteCampaign = () => {
    setLoading(true);
    if (!campaign?.id) return;
    deleteCampaign({ id: campaign.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 pt-40 backdrop-blur-sm sm:h-full sm:pt-0">
      <div className="relative h-full w-full max-w-sm p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black/70 py-4 shadow"
        >
          <button
            onClick={() => setDeleteCampaignModal(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
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

          <div className="rounded-t border-b border-gray-800 py-4 px-6">
            <h3 className="text-center text-base font-semibold text-white lg:text-xl">
              是否確定要刪除此活動？
            </h3>
          </div>
          <div className="flex justify-center py-3">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
            >
              <button
                type="submit"
                onClick={handleDeleteCampaign}
                className="disables:opacity-50 md:text-md rounded bg-red-700 py-2 px-4 text-xs
                font-bold text-white hover:bg-red-500 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "確認"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCampaignModal;
