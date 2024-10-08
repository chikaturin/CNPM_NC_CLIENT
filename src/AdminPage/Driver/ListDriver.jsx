import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ListDriver = () => {
  const [driver, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const fetchDriver = async () => {
    try {
      const res = await fetch(`${URL}/GetDriverByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDriver(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  const handleDeleteDriver = async (id) => {
    try {
      const res = await fetch(`${URL}/DeleteDriver/${id}`);
      const data = await res.json();
      if (res.status === 200) {
        alert("Xóa driver thành công");
        fetchVouchers();
      } else {
        alert("Error: " + (data?.message || "Failed to delete driver"));
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
          Danh sách tài xế
        </h1>
        <div className="flex justify-between my-2 h-fit w-full p-2">
          <Link
            to="/MainAdmin/CreateDriver"
            className="font-semibold bg-[#2F4F4F] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] px-4 py-2 rounded-lg"
          >
            Create Driver
          </Link>
        </div>
        <div className="grid mx-2 grid-cols-1 lg:grid-cols-2 gap-4">
          {driver.map((driver) => (
            <div
              key={driver._id}
              className=" w-full rounded-lg p-4 bg-[#c0e6b3] text-[#2F4F4F]"
            >
              <h2 className="text-2xl font-bold mb-3">{driver.NameDriver}</h2>
              <div className="grid grid-cols-12">
                <div className="col-span-8">
                  <p>
                    <span className="font-bold text-[#4ca771]">
                      Số điện thoại:
                    </span>{" "}
                    {driver.NumberPhone}
                  </p>
                  <p>
                    <span className="font-bold text-[#4ca771]">
                      Bằng lái xe:{" "}
                    </span>
                    {driver.Driving_License}
                  </p>
                  <p>
                    <span className="font-bold text-[#4ca771]">Giá tiền: </span>
                    {driver.Price}
                  </p>
                  <p className="font-bold text-[#4ca771]">
                    Trạng thái xe:{" "}
                    <span
                      className={` font-normal ${
                        driver.StateDriver === "Available"
                          ? "text-[#2E4F4F]"
                          : "text-[#b0211d]"
                      }`}
                    >
                      {driver.StateDriver}
                    </span>
                  </p>
                </div>
                <div className="col-span-4 grid grid-rows-2 gap-2">
                  <Link
                    to={`/MainAdmin/DetailDriver/${driver._id}`}
                    className="bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] px-4 py-2 rounded-lg flex items-center"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faCircleInfo} />
                    Detail
                  </Link>
                  <button
                    onClick={() => handleDeleteDriver(driver._id)}
                    className="bg-[#2F4F4F] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] px-4 py-2 rounded-lg flex items-center"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDriver;
