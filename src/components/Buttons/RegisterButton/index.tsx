import React, { type Dispatch, type SetStateAction } from "react";

type Props = {
  setRegisterModalOn: Dispatch<SetStateAction<boolean>>;
};

const RegisterButton = ({ setRegisterModalOn }: Props) => {
  const handleOpenModal = () => {
    setRegisterModalOn(true);
  };
  return (
    <div className="button-container-1">
      <span className="mas">
        <div className="animate-pulse">Register</div>
      </span>
      <button onClick={handleOpenModal} type="button" name="Hover">
        <div className="animate-pulse">Register</div>
      </button>
    </div>
  );
};

export default RegisterButton;
