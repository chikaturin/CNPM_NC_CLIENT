import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ListVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api"; // URL of the server
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSort = async (selectedNumberSeat) => {
    try {
      if (selectedNumberSeat == "All") {
        fetchVehicles();
        setOpenDropdown(false);
        return;
      }
      const res = await fetch(`${URL}/Sort_Vehicle/${selectedNumberSeat}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setVehicles(data);
      setOpenDropdown(false);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeats = async () => {
    try {
      const res = await fetch(`${URL}/getSort_Vehicle`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setSelectedSeats(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ của chỗ ngối");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${URL}/getVehicleByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDeleteVehecle = async (id) => {
    try {
      const res = await fetch(`${URL}/deleteVehicle/${id}`);
      const data = await res.json();
      if (res.status === 200) {
        alert("Xóa vehicle thành công");
        fetchVouchers();
      } else {
        alert("Error: " + (data?.message || "Failed to delete vehicle"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center w-full text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center w-full text-4xl translate-y-1/2 h-full font-extrabold">
        {error}
      </div>
    );
  }
  const pages = [];
  for (let i = 0; i < Math.ceil(vehicles.length / 6); i++) {
    pages.push(i + 1);
  }

  return (
    <div className="lg:bg-[#eaf9e7] bg-[#4ca771]">
      <div className="w-full bg-[#eaf9e7] rounded-t-xl p-4">
        <h1 className="text-4xl text-[#2F4F4F] mb-4 w-full text-center font-bold">
          Danh sách vehicle
        </h1>
        <div className="flex justify-between my-2 h-fit w-full p-2">
          <div className={`dropdown ${openDropdown ? "dropdown-open" : ""}`}>
            <div
              tabIndex={0}
              role="button"
              className="font-semibold bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] outline-none px-4 py-2 rounded-lg"
              onClick={() => setOpenDropdown(!openDropdown)}>
              <FontAwesomeIcon className="mr-2" icon={faFilter} /> Sort by
              NumberSeats
            </div>
            {openDropdown && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#eaf9e7] rounded-box z-[1] w-52 p-2 shadow-inner shadow-[#4ca771] mt-2">
                <li
                  key="all"
                  className="flex items-center text-[#2F4F4F] text-lg">
                  <a
                    onClick={() => handleSort("all")}
                    className="w-full hover:bg-[#4ca771] hover:text-[#eaf9e7] bg-[#eaf9e7] active:font-bold border-2 border-transparent active:border-[#4ca771]">
                    All
                  </a>
                </li>

                {selectedSeats.map((seat, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[#2F4F4F] text-lg">
                    <a
                      onClick={() => handleSort(seat)}
                      className="w-full hover:bg-[#4ca771] hover:text-[#eaf9e7] bg-[#eaf9e7] active:font-bold border-2 border-transparent active:border-[#4ca771]">
                      {seat}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            to="/MainAdmin/CreateVehicle"
            className="font-semibold bg-[#2F4F4F] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] px-4 py-2 rounded-lg">
            Create Vehicle
          </Link>
        </div>
        <div className="grid mx-2 grid-cols-1 lg:grid-cols-2 gap-4">
          {vehicles.map((vehicle, index) => {
            while (index >= selectedPage * 6 - 6 && index < selectedPage * 6) {
              return (
                <div
                  key={vehicle._id}
                  className=" w-full rounded-lg p-4 bg-[#c0e6b3] text-[#2F4F4F]">
                  <h2 className="text-2xl font-bold mb-3">{vehicle._id}</h2>
                  <div className="grid grid-cols-12">
                    <div className="col-span-8">
                      <p>
                        <span className="font-bold text-[#4ca771]">
                          Số ghế:{" "}
                        </span>{" "}
                        {vehicle.Number_Seats}
                      </p>
                      <p>
                        <span className="font-bold text-[#4ca771]">
                          Hãng xe:{" "}
                        </span>
                        {vehicle.Branch}
                      </p>
                      <p>
                        <span className="font-bold text-[#4ca771]">
                          Giá tiền:{" "}
                        </span>
                        {vehicle.Price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p className="font-bold text-[#4ca771]">
                        Trạng thái xe:{" "}
                        <span
                          className={` font-normal ${
                            vehicle.State === "Available"
                              ? "text-[#2E4F4F]"
                              : "text-[#b0211d]"
                          }`}>
                          {vehicle.State}
                        </span>
                      </p>
                    </div>
                    <div className="col-span-4 grid grid-rows-2 gap-2">
                      <Link
                        to={`/MainAdmin/DetailVehicle/${vehicle._id}`}
                        className="bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] px-4 py-2 rounded-lg flex items-center">
                        <FontAwesomeIcon className="mr-2" icon={faCircleInfo} />
                        Detail
                      </Link>
                      <button
                        onClick={() => handleDeleteVehecle(vehicle._id)}
                        className="bg-[#2F4F4F] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] px-4 py-2 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="w-full flex justify-center mb-10">
        <div
          className={`w-1/5 flex ${
            pages.length == 1 ? "justify-center" : "justify-between"
          }`}>
          {pages.map((page) => {
            return (
              <p
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`w-10 h-10 border-4 border-[#4ca771] text-[#4ca771] flex items-center justify-center text-lg font-bold rounded-full ${
                  selectedPage == page
                    ? "bg-[#4ca771] text-[#fff]"
                    : "bg-[#fff] text-[#4ca771]"
                } cursor-pointer`}>
                {page}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListVehicle;
