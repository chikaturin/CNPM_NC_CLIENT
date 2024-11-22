import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCar,
  faUser,
  faIdCard,
  faFileContract,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="sticky top-0 bg-[#4ca771] text-[#eaf9e7] w-full h-full lg:min-h-[90vh] min-h-fit  p-0 m-0">
      <h1 className="font-extrabold text-xl text-center pt-8 pb-10">
        DANH MỤC QUẢN LÝ
      </h1>
      <div className="p-4">
        <ul className="flex lg:block items-center">
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="Dashboard"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faChartLine} /> DashBoard
            </Link>
          </li>
          {/* <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="HistoryContact"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faChartLine} /> History
            </Link>
          </li> */}
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="ListVehicle"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faCar} /> Vehicle
            </Link>
          </li>
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="ListDriver"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faIdCard} /> Driver
            </Link>
          </li>
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="ListAccount"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faUser} /> Account
            </Link>
          </li>
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="ListContract"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faFileContract} /> Contract
            </Link>
          </li>
          <li className="w-full lg:hover:px-5 py-2 hover:bg-[#eaf9e7] hover:text-[#4ca771] text-center lg:text-left rounded-full mb-4">
            <Link
              to="ListReservation"
              className="route text-lg lg:text-xl font-extrabold"
            >
              <FontAwesomeIcon icon={faNewspaper} /> Reservation
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
