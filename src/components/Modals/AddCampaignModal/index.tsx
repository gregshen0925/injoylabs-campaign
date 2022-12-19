import React, {
  type Dispatch,
  type SetStateAction,
  useRef,
  useState,
} from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { motion } from "framer-motion";
import { trpc } from "../../../utils/trpc";
import { type User, type Campaign } from "@prisma/client";
import { uploadAssetToIpfs } from "../../../utils/uploadIPFS";

type Props = {
  setAddCampaignModal: Dispatch<SetStateAction<boolean>>;
  setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  userInfo: User | null | undefined;
};

const AddCampaignModal = ({ setAddCampaignModal, setCampaigns }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [descirption, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [presenter, setPresenter] = useState<string>("");
  const [presentTitle, setPresentTitle] = useState<string>("");

  const clickOutsidehandler = () => {
    setAddCampaignModal(false);
  };

  const { mutate: addCampaign } = trpc.campaign.addCampaign.useMutation({
    onSuccess(data: Campaign) {
      console.log("added");
      setAddCampaignModal(false);
      setCampaigns((prev) => [...prev, data]);
      setLoading(false);
    },
  });

  const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHost(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  const handlePresenterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPresenter(e.target.value);
  };
  const handlePresentTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPresentTitle(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageToUpload(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (!imageToUpload) return;
    const { path } = await uploadAssetToIpfs(imageToUpload);

    addCampaign({
      title: title,
      host: host,
      time: new Date(time).toISOString(),
      place: place,
      presenter: presenter,
      presentTitle: presentTitle,
      description: descirption,
      image: path,
    });
  };

  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 pt-40 backdrop-blur-sm sm:h-full sm:pt-0">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          // ref={clickOutsideRef}
          className="bg-black-700 relative overflow-y-scroll rounded-2xl bg-black/70 shadow"
        >
          <button
            onClick={() => setAddCampaignModal(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400  hover:bg-gray-800 hover:text-white"
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
              Add Campaign
            </h3>
          </div>
          <div className="space-y-2 p-6">
            <div className="pt-3">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="host"
                  onChange={handleHostChange}
                  id="host"
                  className="peer block w-full appearance-none border-0 border-b-2  border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required={true}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  Host
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="title"
                  onChange={handleTitleChange}
                  id="title"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required={true}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500">
                  Title
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="place"
                  onChange={handlePlaceChange}
                  id="place"
                  className="peer block w-full appearance-none border-0 border-b-2  border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required={true}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500">
                  Place
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="datetime-local"
                  name="time"
                  onChange={handleTimeChange}
                  id="time"
                  className="peer block w-full appearance-none border-0 border-b-2  border-gray-600 bg-transparent py-2.5 px-0 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required={true}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500">
                  Time
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    type="text"
                    name="presenter"
                    onChange={handlePresenterChange}
                    id="presenter"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required={true}
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500">
                    Presenter
                  </label>
                </div>
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    type="text"
                    name="presentTitle"
                    onChange={handlePresentTitleChange}
                    id="presenterTitle"
                    className="peer block w-full appearance-none border-0 border-b-2  border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required={true}
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500">
                    Present Title
                  </label>
                </div>
              </div>

              <textarea
                id="message"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-lg border border-gray-600 bg-transparent p-2.5  text-sm text-white  focus:border-blue-500 focus:ring-blue-500"
                placeholder="Description"
              ></textarea>

              <p className="pt-2 pb-2 text-sm font-normal text-gray-400">
                Main Image
              </p>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                onChange={handleFileChange}
                type="file"
                required={true}
              />
              <div className="flex justify-center pt-5">
                <motion.div
                  whileTap={{
                    scale: 0.8,
                    borderRadius: "100%",
                  }}
                >
                  <button
                    // disabled={!input.trim()}
                    onClick={handleSubmit}
                    className="disables:opacity-50 md:text-md rounded bg-blue-500 py-2 px-4 text-xs
            font-bold text-white hover:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Add Campaign"}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignModal;
