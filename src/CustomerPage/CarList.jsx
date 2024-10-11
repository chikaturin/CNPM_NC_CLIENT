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
  const [selectedSeats, setSelectedSeats] = useState([]);
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

  return (
    <div className="col-span-10 grid grid-cols-4 gap-6 w-full bg-[#f6e2bc] p-10 text-[#2b7a78] h-fit">
      <div className="col-span-4">
        <div className={`dropdown ${openDropdown ? "dropdown-open" : ""}`}>
          <div
            tabIndex={0}
            role="button"
            className="font-semibold bg-[#75bde0] hover:bg-[#f6e2bc] text-[#f6e2bc] hover:text-[#75bde0] border-2 border-[#75bde0] outline-none px-4 py-2 rounded-full"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <FontAwesomeIcon className="mr-2" icon={faFilter} /> Số chỗ ngồi
          </div>
          {openDropdown && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#f6e2bc] rounded-box z-[1] w-52 p-2 shadow-inner shadow-[#75bde0] mt-1"
            >
              <li
                key="all"
                className="flex items-center text-[#2b7a78] text-lg"
              >
                <a
                  onClick={() => handleSort("All")}
                  className="w-full hover:bg-[#75bde0] hover:text-[#f6e2bc] bg-[#f6e2bc] active:font-bold border-2 border-transparent active:border-[#4ca771]"
                >
                  Tất cả
                </a>
              </li>

              {selectedSeats.map((seat, index) => (
                <li
                  key={index}
                  className="flex items-center text-[#2b7a78] text-lg"
                >
                  <a
                    onClick={() => handleSort(seat)}
                    className="w-full hover:bg-[#75bde0] hover:text-[#f6e2bc] bg-[#f6e2bc] active:font-bold border-2 border-transparent active:border-[#4ca771]"
                  >
                    {seat}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {vehicles.map((vehicle) => (
        <Link
          to={`/CarDetail/${vehicle._id}`}
          key={vehicle._id}
          className=" w-full rounded-2xl p-4 bg-[#f6e2bc] text-[#3b7097] shadow-xl shadow-[#75bde0]"
        >
          <img src={vehicle.Image} alt="" className="rounded-xl" />
          <h2 className="text-xl font-bold mb-3 line-clamp-1">
            {vehicle.Branch}
          </h2>
          <div className="bottom-0">
            <p className="text-lg">Xe {vehicle.Number_Seats} chổ</p>
            <p className="my-2">
              <span className="font-bold mr-6">Biển số: </span>
              {vehicle._id}
            </p>
            <div className="w-full border-4 border-[#f6e2bc] rounded-full my-2"></div>
            <p className="flex justify-between">
              <span className="text-[#daa520]">
                <FontAwesomeIcon className="mr-2" icon={faStar} />
                5.0
              </span>
              <span>
                <span className="font-bold">{vehicle.Price}</span>/ngày
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
