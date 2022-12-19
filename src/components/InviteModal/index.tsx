import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";

type Props = {
  setInviteModalOn: Dispatch<SetStateAction<boolean>>;
};

const InviteModal = ({ setInviteModalOn }: Props) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setInviteModalOn(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { mutate: addUser } = trpc.user.addUser.useMutation({
    onSuccess() {
      setLoading(false);
      setInviteModalOn(false);
      toast.success("Successfully added");
    },
  });

  const handleAdd = () => {
    setLoading(true);
    addUser({ id: input, approved: true });
  };

  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 pt-40 backdrop-blur-sm sm:h-full sm:pt-0">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black/70  shadow"
        >
          <button
            onClick={() => setInviteModalOn(false)}
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

          <div className="rounded-t border-b py-4 px-6 dark:border-gray-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white lg:text-2xl">
              邀請會員
            </h3>
          </div>
          <div className="space-y-4 p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400"></p>
            {/* <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul> */}
            <div className=" flex w-full justify-center space-x-2">
              <input
                type="text"
                value={input.trimStart()}
                onChange={handleChange}
                placeholder="請貼上要邀請的使用者 ID"
                className="disables:opacity-50 md:text-md flex-1 rounded border border-gray-300 bg-gray-700 px-4 py-2 text-xs text-white focus:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed"
              />
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  type="submit"
                  onClick={handleAdd}
                  disabled={!input.trimStart()}
                  className="disables:opacity-50 rounded bg-blue-500 py-2 px-4 text-xs font-bold
                text-white hover:bg-blue-700 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "邀請"}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
