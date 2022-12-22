import React, { type Dispatch, type SetStateAction } from "react";

type Props = {
  setRegisterModalOn: Dispatch<SetStateAction<boolean>>;
};

const RegisterButton = ({ setRegisterModalOn }: Props) => {
  const handleOpenModal = () => {
    setRegisterModalOn(true);
  };
  return (
    <div className="">
      {/* <span className="mas">
        <div className="animate-pulse">Register</div>
      </span> */}
      <button onClick={handleOpenModal} type="button" name="Hover">
        <div className="hover:black animate-pulse rounded-2xl bg-black/30 px-5 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
          Register
        </div>
      </button>
    </div>
  );
};

export default RegisterButton;
