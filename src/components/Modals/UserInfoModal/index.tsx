import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { trpc } from "../../../utils/trpc";
import { type User } from "@prisma/client";
import Image from "next/image";

type Props = {
  setUserName: Dispatch<SetStateAction<string | null | undefined>>;
  setUserInfoModal: Dispatch<SetStateAction<boolean>>;
  userInfo: User | null | undefined;
  userName: string | null | undefined;
};

const UserInfoModal = ({
  setUserInfoModal,
  setUserName,
  userInfo,
  userName,
}: Props) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setUserInfoModal(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const { mutate: changeName } = trpc.user.changeName.useMutation({
    onSuccess(user: User) {
      console.log(user.name);
      setLoading(false);
      setUserName(user.name);
      setChange(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    // if (!sessionData?.user?.id) return;
    // changeName({ id: sessionData?.user?.id, name: input });
  };

  const handleOpenChangeBlock = () => {
    setChange(!change);
  };

  const handleCopyText = () => {
    if (!userInfo?.id) return;
    navigator.clipboard.writeText(userInfo?.id);
    setCopied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 pt-40 backdrop-blur-sm sm:h-full sm:pt-0">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black/70 shadow"
        >
          <button
            onClick={() => setUserInfoModal(false)}
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
            <h3 className="text-base font-semibold text-white lg:text-2xl">
              User Info
            </h3>
          </div>
          {userInfo?.image ? (
            <div className="flex justify-center p-5">
              <Image
                className="rounded-full bg-white object-contain"
                height={150}
                width={150}
                src={userInfo?.image}
                alt=""
              />
            </div>
          ) : null}

          <div className="space-y-2 p-6">
            <div className="flex space-x-10">
              <p className="text-md font-normal text-gray-400 sm:text-lg">
                User Name：{userName}
              </p>

              <button
                onClick={handleOpenChangeBlock}
                className="cursor-pointer rounded-xl bg-blue-400 px-2 text-white"
              >
                Change
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-md font-normal text-gray-400 sm:text-lg">
                ID：
              </p>
              {/* <p className="text-sm font-normal text-gray-400 sm:text-lg">
                {userInfo?.id}
              </p> */}

              {copied ? (
                <div className="font-bold text-white">✅ Copied</div>
              ) : (
                <button
                  onClick={handleCopyText}
                  className="cursor-pointer rounded-xl bg-blue-400 px-2 text-white"
                >
                  <div>Copy</div>
                </button>
              )}
            </div>

            {change ? (
              <div className=" flex w-full justify-center space-x-2 pt-2">
                <input
                  type="text"
                  value={input.trim()}
                  onChange={handleChange}
                  placeholder="Username"
                  className="disables:opacity-50 md:text-md flex-1 rounded border border-gray-300 bg-gray-700 px-4 py-2 text-xs 
              text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed"
                />
                <motion.div
                  whileTap={{
                    scale: 0.8,
                    borderRadius: "100%",
                  }}
                >
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    onClick={handleSubmit}
                    className="disables:opacity-50 md:text-md rounded bg-blue-500 py-2 px-4 text-xs
              font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Change"}
                  </button>
                </motion.div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
