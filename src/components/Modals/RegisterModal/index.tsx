import React, { type Dispatch, type SetStateAction, useRef } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useRegister from "../../../hooks/useRegister";
import { uploadAssetToIpfs } from "../../../utils/uploadIPFS";

type Props = {
  setUserName: Dispatch<SetStateAction<string | null | undefined>>;
  setRegisterModalOn: Dispatch<SetStateAction<boolean>>;
};

const RegisterModal = ({ setUserName, setRegisterModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setRegisterModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const {
    imageToUpload,
    setImageToUpload,
    // onChainRegister,
    loading,
    setLoading,
    setNameInput,
    nameInput,
    setDescription,
    offChainRegister,
  } = useRegister();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageToUpload(e.target.files[0]);
    }
  };
  const handleRegister = async () => {
    setLoading(true);

    if (!imageToUpload) {
      setLoading(false);
      return;
    }

    const { path } = await uploadAssetToIpfs(imageToUpload);
    // onChainRegister(path)
    offChainRegister(path).finally(() => {
      setRegisterModalOn(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 pt-40 backdrop-blur-sm sm:h-full sm:pt-0">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black/70 shadow"
        >
          <button
            onClick={() => setRegisterModalOn(false)}
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
              Register Your Account
            </h3>
          </div>
          <form className="px-3">
            <div className="py-3">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                User Name(required)
              </label>
              <input
                type="username"
                id="username"
                value={nameInput.trimStart()}
                onChange={handleNameChange}
                className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your username"
                required={true}
              />
            </div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Avatar(required)
            </label>
            <input
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              onChange={handleFileChange}
              type="file"
              required={true}
            />
            <div className="pt-3">
              <textarea
                id="message"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-lg border border-gray-600 bg-transparent p-2.5 text-sm text-white  focus:border-blue-500 focus:ring-blue-500"
                placeholder="Introduce Yourself"
              ></textarea>
            </div>
            {/* <div className="animate-pulse pt-4 text-center text-red-400">
              Make sure you have APT in your wallet
            </div> */}

            <div className="flex justify-center py-5">
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 disabled:cursor-not-allowed"
                  disabled={!nameInput.trimStart() || !imageToUpload}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
