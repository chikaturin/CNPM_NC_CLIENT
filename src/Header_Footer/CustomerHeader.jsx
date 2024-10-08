import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../Router/ProtectedRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";

const CustomerHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="w-full">
      <header className="fixed h-20 items-center top-0 px-4 grid grid-cols-2 shadow-md shadow-[#75bde0] left-0 z-50 w-full bg-[#f6e2bc] text-[#3b7097]">
        <div className="w-full flex items-center">
          <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
          <span className="ml-2 text-3xl font-bold">CARental</span>
        </div>
        <div className="w-full grid grid-cols-4 items-center ml-auto">
          <div className="bg-[#f6e2bc] hover:bg-[#75bde0] font-bold text-xl hover:text-[#f6e2bc] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon className="mr-2" icon={faCarSide} />
            Cars
          </div>
          <div className="bg-[#f6e2bc] hover:bg-[#75bde0] font-bold text-xl hover:text-[#f6e2bc] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon className="mr-2" icon={faClockRotateLeft} />
            History
          </div>
          <div className="bg-[#f6e2bc] hover:bg-[#75bde0] font-bold text-xl hover:text-[#f6e2bc] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon className="mr-2" icon={faUser} />
            Your Profile
          </div>
          <div
            className="bg-[#f6e2bc] hover:bg-[#75bde0] font-bold text-3xl hover:text-[#f6e2bc] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer"
            onClick={handleLogout}
          >
            <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default CustomerHeader;
