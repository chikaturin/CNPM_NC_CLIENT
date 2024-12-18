import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faFilter,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([4, 8, 16, 30, 45]);
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

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // const fetchSeats = async () => {
  //   try {
  //     const res = await fetch(`${URL}/getSort_Vehicle`);
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await res.json();
  //     setSelectedSeats(data);
  //   } catch (error) {
  //     setError("Không thể lấy dữ liệu từ máy chủ của chỗ ngối");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSeats();
  // }, []);
  const pages = [];

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${URL}/getVehicleByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setVehicles(data);
      console.log("vehicle: " + data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

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

  for (let i = 0; i < Math.ceil(vehicles.length / 12); i++) {
    pages.push(i + 1);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full bg-[#ffffff] p-10 text-[#2b7a78] min-h-screen">
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className={`dropdown ${openDropdown ? "dropdown-open" : ""}`}>
            <div
              tabIndex={0}
              role="button"
              className="font-semibold bg-[#75bde0] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#75bde0] border-2 border-[#75bde0] outline-none px-4 py-2 rounded-full"
              onClick={() => setOpenDropdown(!openDropdown)}>
              <FontAwesomeIcon className="mr-2" icon={faFilter} /> Số chỗ ngồi
            </div>
            {openDropdown && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#ffffff] rounded-box z-[1] w-52 p-2 shadow-inner shadow-[#75bde0] mt-1">
                <li
                  key="all"
                  className="flex items-center text-[#2b7a78] text-lg">
                  <a
                    onClick={() => {
                      handleSort("All");
                      setSelectedPage(1);
                    }}
                    className="w-full hover:bg-[#75bde0] hover:text-[#ffffff] bg-[#ffffff] active:font-bold border-2 border-transparent active:border-[#4ca771]">
                    Tất cả
                  </a>
                </li>

                {selectedSeats.map((seat, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[#2b7a78] text-lg">
                    <a
                      onClick={() => {
                        handleSort(seat);
                        setSelectedPage(1);
                      }}
                      className="w-full hover:bg-[#75bde0] hover:text-[#ffffff] bg-[#ffffff] active:font-bold border-2 border-transparent active:border-[#4ca771]">
                      {seat}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {console.log("pages: " + pages)}
        {vehicles.map((vehicle, index) => {
          while (index >= selectedPage * 12 - 12 && index < selectedPage * 12) {
            return (
              <Link
                to={
                  vehicle.State === "Available"
                    ? `/CarDetail/${vehicle._id}`
                    : `/Reservation/${vehicle._id}`
                }
                key={vehicle._id}
                className="w-full rounded-2xl p-4 bg-[#f3f3f3] text-[#3b7097] shadow-xl shadow-[#75bde0]">
                <img
                  src={vehicle.images[0].ImageVehicle}
                  alt=""
                  className="rounded-xl h-3/5 w-full"
                />
                <h2 className="text-xl font-bold mb-3 line-clamp-1">
                  {vehicle.VehicleName}
                </h2>
                <div className="bottom-0">
                  <p className="text-lg">Xe {vehicle.Number_Seats} chổ</p>
                  <p className="my-2">
                    <span className="font-bold mr-6">Biển số: </span>
                    {vehicle._id}
                  </p>
                  <div className="w-full border-4 border-[#ffffff] rounded-full my-2"></div>
                  <p className="flex justify-between">
                    <span className="text-[#daa520]">
                      <FontAwesomeIcon className="mr-2" icon={faStar} />
                      5.0
                    </span>
                    <span>
                      <span className="font-bold">
                        {formattedPrice(vehicle.Price)}
                      </span>
                      /ngày
                    </span>
                  </p>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <div className="w-full flex justify-center mb-10">
        <div
          className={`w-1/12 flex ${
            pages.length == 1 ? "justify-center" : "justify-between"
          }`}>
          {pages.map((page) => {
            return (
              <p
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`w-10 h-10 border-4 border-[#75bde0] text-[#75bde0] flex items-center justify-center text-lg font-bold rounded-full ${
                  selectedPage == page
                    ? "bg-[#75bde0] text-[#fff]"
                    : "bg-[#fff] text-[#75bde0]"
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

export default Home;
