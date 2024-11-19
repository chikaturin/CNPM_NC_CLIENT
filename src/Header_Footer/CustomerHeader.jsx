import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../Router/ProtectedRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faFileInvoice,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faFileImport } from "@fortawesome/free-solid-svg-icons/faFileImport";

const CustomerHeader = () => {
  const location = useLocation();
  return (
    <div className="w-full">
      <header className="lg:fixed lg:h-20 items-center top-0 px-4 grid lg:grid-cols-2 shadow-md shadow-[#75bde0] left-0 z-50 w-full bg-[#fff] text-[#3b7097]">
        <Link to="Home" className="w-full flex items-center">
          <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
          <span className="ml-2 text-3xl font-bold">CARental</span>
        </Link>
        <div className="w-full grid grid-cols-4 gap-6 items-center ml-auto">
          <div className="w-full"></div>
          <Link
            to="CarList"
            className={`${
              location.pathname == "/CarList"
                ? "bg-[#75bde0] text-[#fff]"
                : "bg-[#fff]"
            } hover:bg-[#75bde0] font-bold text-xl hover:text-[#fff] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer`}>
            <FontAwesomeIcon className="mr-2" icon={faCarSide} />
            Cars
          </Link>
          <Link
            to="DemiseCar"
            className={`${
              location.pathname == "/DemiseCar"
                ? "bg-[#75bde0] text-[#fff]"
                : "bg-[#fff]"
            } hover:bg-[#75bde0] font-bold text-xl hover:text-[#fff] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer`}>
            <FontAwesomeIcon className="mr-2" icon={faFileInvoice} />
            Cho thuê
          </Link>
          <Link
            to="History"
            className={`${
              location.pathname == "/History"
                ? "bg-[#75bde0] text-[#fff]"
                : "bg-[#fff]"
            } hover:bg-[#75bde0] font-bold text-xl hover:text-[#fff] p-2 rounded-lg w-full h-full flex items-center justify-center cursor-pointer`}>
            <FontAwesomeIcon className="mr-2" icon={faClockRotateLeft} />
            History
          </Link>
        </div>
      </header>
    </div>
  );
};

export default CustomerHeader;
