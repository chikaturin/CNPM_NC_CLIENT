import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DetailDriver = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salary, setSalary] = useState(null);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const formatPrice = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const DetailFetch = async () => {
    try {
      const res = await fetch(`${URL}/GetDriverById/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
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
    DetailFetch();
  }, [id]);

  const fetchsalary = async () => {
    const res = await fetch(`${URL}/findContractDriver/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data === null) {
      setSalary("N/A");
      return;
    }
    console.log(data);
    setSalary(data.salary);
    console.log(salary.salary);
  };
  useEffect(() => {
    fetchsalary();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${URL}/DeleteDriver/${id}`);
      const driver = await res.json();
      if (res.status === 200) {
        alert("Xóa driver thành công");
        DetailFetch();
      } else {
        alert("Error: " + (driver.message || "Failed to delete driver"));
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
      <div className="w-full bg-[#eaf9e7] p-4 rounded-t-xl">
        <div className="grid grid-cols-12 text-[#4ca771]">
          <div className="col-span-11 flex items-center">
            <span className="text-4xl flex mt-4 mb-10 w-full text-left font-bold px-10">
              Chi tiết tài xế
              <span className="text-3xl mt-1 lg:flex hidden font-bold mb-2">
                : {driver._id}
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
              src={driver.Image}
              alt="driver"
            />
          </div>
          <div className="w-full text-[#2F4F4F]">
            <h1 className="text-3xl font-bold mb-2">{driver.NameDriver}</h1>
            <div className="w-full border-b border-[#4ca771] mb-10">
              <span className="text-xl text-[#4ca771]">{driver._id}</span>
              <span className="float-right font-bold text-xl text-[#4ca771]">
                Trạng thái:{" "}
                <span
                  className={`font-normal ${
                    driver.StateDriver === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {driver.StateDriver}
                </span>
              </span>
            </div>
            <div>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Số điện thoại:{" "}
                </span>
                {driver.NumberPhone || "N/A"}
              </p>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">Bằng lái: </span>
                {driver.Driving_License || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Giá tiền/Ngày:{" "}
                </span>
                {driver.Price || "N/A"}
              </p>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Lương tài xế tháng 11:{" "}
                </span>
                {salary || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 w-full justify-center mt-10">
          <div className="col-span-1"></div>
          <div className="col-span-5">
            <Link to={`/MainAdmin/EditDriver/${id}`}>
              <button className="bg-[#4ca771] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] p-5 rounded-lg flex items-center justify-center w-full">
                <FontAwesomeIcon icon={faEdit} />
                <span className="ml-2">Edit</span>
              </button>
            </Link>
          </div>
          <div className="col-span-5">
            <button
              className="bg-[#2F4F4F] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] p-5 rounded-lg flex items-center justify-center w-full"
              onClick={() => handleDelete(id)}
            >
              <FontAwesomeIcon icon={faTrash} />
              <span className="ml-2">Delete</span>
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailDriver;
