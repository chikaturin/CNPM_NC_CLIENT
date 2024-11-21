import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ListReservation = () => {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const fetchReservation = async () => {
    try {
      const res = await fetch(`${URL}/getvehicle_reservationbyadmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setReservation(data);
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

  const date = (a) => {
    return new Date(a).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  const handleSubmit = async (id) => {
    console.log("index", id);
    if (!reservation[id]) {
      alert("Reservation not found!");
      return;
    }

    const { Desired_Date, Return_Date, Price, MaVehicle, _id } =
      reservation[id];
    if (!Desired_Date || !Return_Date || !Price) {
      alert("Invalid reservation data!");
      return;
    }
    try {
      const response = await fetch(`${URL}/PaymentContract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          Pickup_Date: new Date(Desired_Date).toISOString(),
          Return_Date: new Date(Return_Date).toISOString(),
          MaVehicle: MaVehicle,
          Total_Pay: Price,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Created successfully");
        handleDeleteReservation2(_id);
      } else {
        alert("Error: " + (data?.message || "Failed to create "));
      }
    } catch (err) {
      console.error("Error :", err);
      alert("An error occurred while creating the .");
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      const res = await fetch(`${URL}/deletevehicle_reservation/${id}`);
      const data = await res.json();
      if (res.status === 200) {
        alert("Xóa reservation thành công");
      } else {
        alert("Error: " + (data?.message || "Failed to delete reservation"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteReservation2 = async (id) => {
    try {
      const res = await fetch(`${URL}/deletevehicle_reservation/${id}`);
      const data = await res.json();
      if (res.status === 200) {
        console.log("Xóa reservation thành công");
        window.location.reload();
      } else {
        alert("Error: " + (data?.message || "Failed to delete reservation"));
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

  return (
    <div className="lg:bg-[#eaf9e7] bg-[#4ca771]">
      <div className="w-full bg-[#eaf9e7] rounded-t-xl p-4">
        <h1 className="text-4xl text-[#2F4F4F] mb-4 w-full text-center font-bold">
          Danh sách đặt xe trước
        </h1>
        <div className="grid mx-2 grid-cols-1 lg:grid-cols-2 gap-4">
          {reservation.map((res, index) => {
            return (
              <div
                key={res._id}
                className="w-full rounded-lg p-4 bg-[#c0e6b3] text-[#2F4F4F]"
              >
                <h2 className="text-2xl font-bold mb-3">{res._id}</h2>
                <div className="grid grid-cols-12">
                  <div className="col-span-8">
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Ngày đặt trước:
                      </span>{" "}
                      {date(res.Desired_Date)}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Ngày trả:
                      </span>{" "}
                      {date(res.Return_Date)}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Mã khách hàng:
                      </span>{" "}
                      {res.MaKH}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Mã Phương tiện:
                      </span>{" "}
                      {res.MaVehicle}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Số tiền còn lại:
                      </span>{" "}
                      {formattedPrice(res.Price)}
                    </p>
                  </div>
                  <div className="col-span-4">
                    <div className="w-full pt-3">
                      <button
                        onClick={() => handleSubmit(index)}
                        className="bg-[#3a942a] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#3a942a] px-4 py-2 rounded-lg flex items-center"
                      >
                        Create Contract
                      </button>
                    </div>
                    <div className="w-full pt-3">
                      <button
                        onClick={() => handleDeleteReservation(res._id)}
                        className="bg-[#2F4F4F] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] px-10 py-2 rounded-lg flex items-center"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                      </button>
                    </div>
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

export default ListReservation;
