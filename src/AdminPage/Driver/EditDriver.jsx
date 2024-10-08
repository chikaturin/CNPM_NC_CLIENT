import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditDriver = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const DetailFetch = async () => {
    try {
      const res = await fetch(`${URL}/GetDriverById/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setDetail(data);
    } catch (error) {
      console.error("DetailFetch Error:", error); // Thêm log lỗi
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    DetailFetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedVehicle = {
      NumberPhone: driver.NumberPhone || detail.NumberPhone,
      Price: driver.Price || detail.Price,
      Image: driver.Image || detail.Image,
      StateDriver: driver.StateDriver || detail.StateDriver,
    };

    try {
      const res = await fetch(`${URL}/UpdateDriver/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVehicle),
      });
      const result = await res.json();
      if (!res.ok) {
        alert("Error: " + (result.message || "Failed to update vehicle"));
      }
      alert("Cập nhật thành công");
      navigate("/MainAdmin/ListDriver");
    } catch (err) {
      alert("Error: " + (err.message || "Failed to update vehicle"));
      console.log(err);
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
      <div className="w-full bg-[#eaf9e7] p-4 rounded-t-xl">
        <div className="grid grid-cols-12 text-[#4ca771]">
          <div className="col-span-11 flex items-center">
            <span className="text-4xl flex mt-4 mb-10 w-full text-left font-bold px-10">
              Chi tiết tài xế
              <span className="text-3xl mt-1 lg:flex hidden font-bold mb-2">
                : {detail._id}
              </span>
            </span>
          </div>
          <div className="col-span-1 flex items-center ">
            <Link to={`/MainAdmin/ListDriver`}>
              <button className="bg-[#eaf9e7] hover:bg-[#4ca771] w-10 h-10 border-4 border-[#4ca771] hover:text-[#eaf9e7] font-bold rounded-full">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="p-10">
            <img
              className="w-full rounded-xl h-auto object-cover"
              src={detail.Image}
              alt="driver"
            />
          </div>
          <div className="w-full text-[#2F4F4F]">
            <h1 className="text-3xl font-bold mb-2">{detail.NameDriver}</h1>
            <div className="w-full border-b border-[#4ca771] mb-10">
              <span className="text-xl text-[#4ca771]">{detail._id}</span>
              <span className="float-right font-bold text-xl text-[#4ca771]">
                Trạng thái:{" "}
                <span
                  className={`font-normal ${
                    detail.StateDriver === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {detail.StateDriver}
                </span>
              </span>
            </div>
            <div>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Số điện thoại:{" "}
                </span>
                {detail.NumberPhone || "N/A"}
              </p>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">Bằng lái: </span>
                {detail.Driving_License || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Giá tiền/Ngày:{" "}
                </span>
                {detail.Price || "N/A"}
              </p>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Tài xế của xe:{" "}
                </span>
                {detail.Vehicle_ID || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border-t-2 mx-8 pb-4 ">
          <div className="grid lg:grid-cols-2 grid-cols-1 ">
            <div className="grid grid-cols-12 mx-2 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 mt-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Số điện thoại mới</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập số điện thoại mới"
                  onChange={(e) =>
                    setDriver({ ...driver, NumberPhone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mx-2 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 mt-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Giá tiền mới</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập giá tiền mới"
                  onChange={(e) =>
                    setDriver({ ...driver, Price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mx-2 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 mt-8 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">ảnh mới</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập ảnh mới"
                  onChange={(e) =>
                    setDriver({ ...driver, Image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mx-2 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 mt-8 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Trạng thái </label>
              </div>
              <div className="col-span-12">
                <select
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  onChange={(e) =>
                    setDriver({ ...driver, StateDriver: e.target.value })
                  }
                >
                  <option value={detail.StateDriver}>
                    {detail.StateDriver}
                  </option>
                  <option
                    value="Available"
                    hidden={detail.StateDriver === "Available"}
                  >
                    Available
                  </option>
                  <option
                    value="Unavailable"
                    hidden={detail.StateDriver === "Unavailable"}
                  >
                    Unavailable
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-10 w-full justify-center mt-10">
            <div className="col-span-1"></div>
            <div className="col-span-5">
              <button
                onClick={handleSubmit}
                className="bg-[#4ca771] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] p-5 rounded-lg flex items-center justify-center w-full"
              >
                <FontAwesomeIcon icon={faEdit} />
                <span className="ml-2">Edit</span>
              </button>
            </div>
            <div className="col-span-5">
              <Link to={"/MainAdmin/ListDriver"}>
                <button className="bg-[#2F4F4F] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] p-5 rounded-lg flex items-center justify-center w-full">
                  <FontAwesomeIcon icon={faXmark} className="mr-2" />
                  Cancel
                </button>
              </Link>
            </div>
            <div className="col-span-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDriver;
