import { useState } from "react";

const useAddCampaign = () => {
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [descirption, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [presenter, setPresenter] = useState<string>("");
  const [presentTitle, setPresentTitle] = useState<string>("");

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

  return {
    loading,
    setLoading,
    descirption,
    setDescription,
    imageToUpload,
    title,
    host,
    time,
    place,
    presenter,
    presentTitle,
    handleHostChange,
    handleTitleChange,
    handleTimeChange,
    handlePlaceChange,
    handlePresenterChange,
    handlePresentTitleChange,
    handleFileChange,
  };
};

export default useAddCampaign;
