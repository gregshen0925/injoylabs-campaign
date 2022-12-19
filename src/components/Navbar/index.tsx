import { type User } from "@prisma/client";
import Link from "next/link";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

type Props = {
  setUserInfoModal: Dispatch<SetStateAction<boolean>>;
  userInfoModal: boolean;
  userInfo: User | null | undefined;
  setAddCampaignModal: Dispatch<SetStateAction<boolean>>;
  setAddUserModal: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({
  setUserInfoModal,
  userInfoModal,
  userInfo,
  setAddCampaignModal,
}: // userInfo,
// setAddUserModal,
// setAddCampaignModal,
Props) => {
  const [nav, setNav] = useState<boolean>(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const address = "1";

  const handleNav = () => {
    setNav(!nav);
  };

  const handleUserModal = () => {
    setUserInfoModal(true);
    setNav(false);
    console.log(userInfoModal);
  };

  const handleAddCampaignModal = () => {
    setAddCampaignModal(true);
    setNav(!nav);
  };

  // const handleAddUserModal = () => {
  //   setAddUserModal(true);
  //   setNav(!nav);
  // };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  });

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 z-10 w-full duration-300 ease-in"
    >
      <div className="flex items-center justify-between p-4 text-white">
        <Link href="/">
          <div
            style={{ color: `${textColor}` }}
            className="text-2xl font-bold sm:text-4xl"
          >
            InJoy Labs Campaign
          </div>
        </Link>
        <ul
          style={{ color: `${textColor}` }}
          className="hidden font-bold sm:flex"
        >
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          {address ? (
            <>
              <li className="p-4">
                <button onClick={handleUserModal} className="cursor-pointer">
                  User Info
                </button>
              </li>
              {userInfo?.isAdmin ? (
                <>
                  <li className="p-4">
                    <button
                      onClick={handleAddCampaignModal}
                      className="cursor-pointer"
                    >
                      新增活動
                    </button>
                  </li>
                  {/* <li className="p-4">
                    <button
                      onClick={handleAddUserModal}
                      className="cursor-pointer"
                    >
                      新增會員
                    </button>
                  </li> */}
                </>
              ) : null}

              {/* <li className="p-4">
                <Link href="/">首頁</Link>
              </li>
              <li className="p-4">
                <Link href="/">首頁</Link>
              </li> */}
            </>
          ) : null}
        </ul>

        {/*Mobile Button */}
        <div className="z-10 block sm:hidden" onClick={handleNav}>
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={30} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "absolute top-0 left-0 right-0 bottom-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
              : "absolute top-0 left-[-100%] right-0 bottom-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-2xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            {address ? (
              <>
                <li className="p-4">
                  <div onClick={handleUserModal}>User Info</div>
                </li>
                {/* {userInfo?.isAdmin ? (
                  <>
                    <li className="p-4">
                      <button
                        onClick={handleAddCampaignModal}
                        className="cursor-pointer"
                      >
                        新增活動
                      </button>
                    </li>
                    <li className="p-4">
                      <button
                        onClick={handleAddUserModal}
                        className="cursor-pointer"
                      >
                        新增會員
                      </button>
                    </li>
                  </>
                ) : null} */}
                {/* <li className="p-4">
                <Link href="/">首頁</Link>
              </li>
              <li className="p-4">
                <Link href="/">首頁</Link>
              </li> */}
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
