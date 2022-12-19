import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useEffect, useState } from "react";
import { targetNetwork } from "../constants";
import { client, MODULE_ADDRESS } from "../utils/aptosClient";

const useCheckUserStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>();
  const [avatar, setAvatar] = useState<string>();
  const { account, connected, network } = useWallet();

  useEffect(() => {
    // check if connected
    if (
      !connected ||
      !account?.address?.toString() ||
      !(
        network?.name?.toString().toLowerCase() == targetNetwork ||
        "Aptos testnet"
      )
    ) {
      setLoading(true);
      return;
    }
    setLoading(true);
    // check if registered
    const getUserName = async () => {
      if (!account.address?.toString) return;
      await client
        .getAccountResource(
          account?.address?.toString(),
          `${MODULE_ADDRESS}::profile::Profile`
        )
        .then((profile) => {
          // console.log(profile)
          //@ts-ignore
          setUserName(profile.data.username);
          //@ts-ignore
          setAvatar("https://ipfs.io/ipfs/" + profile.data.avatar);
        })
        .catch((err) => {
          console.log(err);
          setUserName("");
          setAvatar("");
        });
      setLoading(false);
    };
    getUserName();
  }, [connected, network, account?.address]);

  return { loading, userName, avatar, setUserName };
};

export default useCheckUserStatus;
