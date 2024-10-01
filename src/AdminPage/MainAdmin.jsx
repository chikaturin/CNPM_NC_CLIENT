import React from "react";
import { Outlet, Link } from "react-router-dom";
import Hearder from "../Header_Footer/Hearder";
import Nav from "../Header_Footer/Nav";

const MainAdmin = () => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <Hearder className="w-full" />
      <div className="grid grid-cols-12 gap-0 w-full pt-20 bg-[#eaf9e7]">
        <div className="col-span-12 lg:col-span-2">
          <Nav />
        </div>
        <div className="col-span-12 lg:col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
