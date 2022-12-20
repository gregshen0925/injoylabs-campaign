import { useState } from "react";
import { client, type Types, MODULE_ID } from "../utils/aptosClient";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import toast from "react-hot-toast";
import { trpc } from "../utils/trpc";

const useRegister = () => {
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const { account, signAndSubmitTransaction } = useWallet();
  const [nameInput, setNameInput] = useState<string>("");
  const [descirption, setDescription] = useState<string>("");

  const { mutate: register } = trpc.user.createUser.useMutation({
    onSuccess() {
      toast.success("Successfully registered");
    },
  });

  const onChainRegister = async (path: string) => {
    if (account?.address || account?.publicKey) {
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${MODULE_ID}::register`,
        type_arguments: [],
        arguments: [nameInput, "", "", path],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client
        .waitForTransaction(transactionRes?.hash || "", { checkSuccess: true })
        .then(() => {
          // setUserName(input);
          toast.success(
            "Your avatar will show within a minute due to IPFS gateway issue."
          );
          setLoading(false);
        });
    }
    // return path;
  };

  const offChainRegister = async (path: string) => {
    if (!account?.address) return;
    register({
      name: nameInput,
      address: account?.address?.toString(),
      image: "https://ipfs.io/ipfs/" + path,
      description: descirption,
    });
  };

  return {
    imageToUpload,
    setImageToUpload,
    onChainRegister,
    loading,
    setLoading,
    nameInput,
    setNameInput,
    setDescription,
    offChainRegister,
  };
};

export default useRegister;
