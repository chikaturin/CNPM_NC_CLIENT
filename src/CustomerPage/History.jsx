import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../Router/ProtectedRoute";
import { useNavigate } from "react-router-dom";

import {
  faFileContract,
  faHandshake,
  faBookMedical,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [StatePay, setStatePay] = useState("Staked");
  const [reservation, setReservation] = useState([]);
  const [click, setClick] = useState(1);
  const token = localStorage.getItem("accessToken");
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const Reservation = (id) => {
    const DetailFetch = async () => {
      try {
        const res = await fetch(`${URL}/DetailVehicle/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        if (data.State === "Available") {
          navigate(`/CarDetail/${id}`);
        } else {
          navigate(`/Reservation/${id}`);
        }
      } catch (e) {
        setError("Không thể lấy dữ liệu từ máy chủ");
        console.error("Error fetching data: ", e);
      } finally {
        setLoading(false);
      }
    };

    DetailFetch();
  };

  const date = (a) => {
    return new Date(a).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${URL}/HistoryContractByCustomer/${StatePay}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      setHistory(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (StatePay === "Staked") {
      fetchHistory();
    } else if (StatePay === "Paid") {
      fetchHistory();
    }
  }, [StatePay, reservation]);

  const fetchAccount = async () => {
    try {
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAccount(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchReservation = async () => {
    try {
      const response = await fetch(`${URL}/getVehicle_ReservationByCus`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReservation(data.reservations);
      console.log("data reservation", data.reservations);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (click === 3) fetchReservation();
  }, [click]);

  const handleDeleted = async (iddeleted) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn huỷ đặt xe này không vì bạn phải mất phí?"
      )
    ) {
      try {
        const response = await fetch(
          `${URL}/deleteVehicle_Reservation/${iddeleted}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.reload();
      } catch (error) {
        setError("Không thể lấy dữ liệu từ máy chủ");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <div className=" translate-y-1/2 w-full">
        <p>Đang tải...</p>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white grid grid-cols-3 gap-4 p-6">
      <div className="w-full  border-y-4 border-x-2 border-gray-500 h-fit rounded-lg p-4">
        <div className="flex">
          <img
            src="https://cnpmclient.vercel.app/assets/NiceService-K_IFc-AM.png"
            className="rounded-lg w-20 h-20"
            alt="ảnh"
          />
          <span className="font-bold text-black text-3xl px-4 translate-y-1/4">
            <span>{account.NameCus}</span>
            <span>- {account.NumberPhone}</span>
          </span>
        </div>
        <div className="border-y-4 border-gray-500 mt-6 pt-4">
          <p
            className={`text-black text-2xl font-bold  ${
              click === 1
                ? "bg-[#75BDDF] text-white hover:bg-[#80c8ff]"
                : "text-black hover:bg-[#e0e0e0]"
            } p-4 rounded-xl `}
            onClick={() => (setStatePay("Staked"), setClick(1))}
          >
            <FontAwesomeIcon className="mr-2" icon={faHandshake} />
            Hợp đồng đang thuê
          </p>
          <p
            className={`text-black text-2xl font-bold ${
              click === 2
                ? "bg-[#75BDDF] text-white hover:bg-[#80c8ff]"
                : "text-black hover:bg-[#e0e0e0]"
            } p-4 rounded-xl my-2`}
            onClick={() => (setStatePay("Paid"), setClick(2))}
          >
            <FontAwesomeIcon className="mr-2" icon={faBookMedical} /> Hợp đồng
            đã thuê
          </p>
          <p
            className={`text-black text-2xl font-bold ${
              click === 3
                ? "bg-[#75BDDF] text-white hover:bg-[#80c8ff]"
                : "text-black hover:bg-[#e0e0e0]"
            } p-4 rounded-xl my-2`}
            onClick={() => setClick(3)}
          >
            <FontAwesomeIcon className="mr-2" icon={faFileContract} /> Đặt xe
            trước
          </p>
        </div>
        <div className=" hover:bg-[#e0e0e0] rounded-xl my-4 p-4">
          <button
            onClick={handleLogout}
            className="text-black text-2xl font-bold"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowRightFromBracket} />{" "}
            Đăng Xuất
          </button>
        </div>
      </div>
      <div className="w-full col-span-2 ">
        <p className="text-4xl font-bold text-black text-center">
          {click === 1
            ? "Hợp đồng đang thuê"
            : click === 2
            ? "Hợp đồng đã thuê"
            : "Đặt xe trước"}
        </p>
        <div className="w-full h-[75vh] overflow-y-auto mt-6">
          {click !== 3 &&
            history.map((history) => {
              return (
                <div
                  key={history._id}
                  className="bg-white rounded-lg w-full flex justify-center my-4"
                >
                  <div className="w-3/4  border-2 border-x-4 border-x-[#75BDDF] p-4 rounded-xl">
                    <h1 className="text-3xl text-center text-black font-bold">
                      {history._id}-
                      <span
                        className={`${
                          StatePay == "Staked"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {history.StatePay}
                      </span>
                    </h1>
                    <div className="w-full">
                      <div className="w-full text-[#2F4F4F]">
                        <div>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Ngày đăng ký hợp đồng:{" "}
                            </span>
                            {date(history.ContractDate) || "N/A"}
                          </p>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Ngày đặt:{" "}
                            </span>
                            {date(history.Pickup_Date) || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full text-[#2F4F4F]">
                        <div>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Ngày trả:{" "}
                            </span>
                            {date(history.Return_Date) || "N/A"}
                          </p>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Tổng tiền:{" "}
                            </span>
                            {history.Total_Pay || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div
                        className={`w-full text-[#2F4F4F] ${
                          history.MaDriver ? "block" : "hidden"
                        }`}
                      >
                        <p className="text-xl my-2 flex justify-between pr-10">
                          <span className="font-bold text-[#75BDDF]">
                            Mã tài xế:{" "}
                          </span>
                          {history.MaDriver || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full text-[#2F4F4F]">
                      <div>
                        <p className="text-xl my-2 flex justify-between pr-10">
                          <span className="font-bold text-[#75BDDF]">
                            Mã xe:{" "}
                          </span>
                          {history.MaVehicle || "N/A"}
                        </p>
                        <p className="text-xl my-2 flex justify-between pr-10">
                          <span className="font-bold text-[#75BDDF]">
                            Mã Khách hàng:{" "}
                          </span>
                          {history.MaKH || "N/A"}
                        </p>
                      </div>
                    </div>
                    {StatePay == "Paid" ? (
                      <div className="px-4 grid grid-cols-2 gap-4">
                        <button
                          onClick={() => Reservation(history.MaVehicle)}
                          className="bg-[#75bde0] hover:bg-[#ffffff] font-bold text-lg text-[#ffffff] hover:text-[#75bde0] border-2 border-[#75bde0] p-2 rounded-lg flex items-center justify-center w-full"
                        >
                          Thuê xe lại
                        </button>
                        <button className="bg-[#3b7097] hover:bg-[#ffffff] font-bold text-lg text-[#ffffff] hover:text-[#3b7097] border-2 border-[#3b7097] p-2 rounded-lg flex items-center justify-center w-full">
                          Report
                        </button>
                      </div>
                    ) : (
                      <div className="px-4">
                        <button className="bg-[#3b7097] hover:bg-[#ffffff] font-bold text-lg text-[#ffffff] hover:text-[#3b7097] border-2 border-[#3b7097] p-2 rounded-lg flex items-center justify-center w-full">
                          Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          {click === 3 &&
            reservation.map((reservation) => {
              return (
                <div
                  key={history._id}
                  className="bg-white rounded-lg w-full flex justify-center my-4"
                >
                  <div className="w-3/4  border-2 border-x-4 border-x-[#75BDDF] p-4 rounded-xl">
                    <h1 className="text-3xl text-center text-black font-bold">
                      {reservation._id}
                    </h1>
                    <div className="w-full">
                      <div className="w-full text-[#2F4F4F]">
                        <div>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Ngày mong muốn:{" "}
                            </span>
                            {date(reservation.Desired_Date) || "N/A"}
                          </p>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Ngày trả:{" "}
                            </span>
                            {date(reservation.Return_Date) || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Số tiền chưa trả:{" "}
                            </span>
                            {formatPrice((reservation.Price * 80) / 100) ||
                              "N/A"}
                          </p>
                          <p className="text-xl my-2 flex justify-between pr-10">
                            <span className="font-bold text-[#75BDDF]">
                              Mã xe:{" "}
                            </span>
                            {reservation.MaVehicle || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <button
                        className="bg-[#75BDDF] w-1/2  hover:bg-[#fff] border-2 border-[#75BDDF] hover:text-[#75BDDF] text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          handleDeleted(reservation._id);
                        }}
                      >
                        Huỷ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default History;
