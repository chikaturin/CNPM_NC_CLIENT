import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DetailVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "http://localhost:8000/api";

  const DetailFetch = async () => {
    try {
      const res = await fetch(`${URL}/DetailVehicle/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setVehicle(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    DetailFetch();
  }, [id]);

  const handleDeleteVehicle = async (id) => {
    try {
      const res = await fetch(`${URL}/deleteVehicle/${id}`, {
        method: "get",
      });
      const vehicle = await res.json();
      if (res.status === 200) {
        alert("Xóa vehicle thành công");
        DetailFetch();
      } else {
        alert("Error: " + (vehicle.message || "Failed to delete vehicle"));
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
              Chi tiết xe
              <span className="text-3xl mt-1 lg:flex hidden font-bold mb-2">
                : {vehicle._id}
              </span>
            </span>
          </div>
          <div className="col-span-1 flex items-center ">
            <Link to={`/MainAdmin/ListVehicle`}>
              <button className="bg-[#eaf9e7] hover:bg-[#4ca771] w-10 h-10 border-4 border-[#4ca771] hover:text-[#eaf9e7] font-bold rounded-full">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <img
            className="w-full mx-2 rounded-xl h-full object-cover"
            src={vehicle.Image}
            alt="Vehicle"
          />
          <div className="ml-2 grid grid-cols-3 lg:block w-full">
            {vehicle.imageVehicle && vehicle.imageVehicle.length > 0 ? (
              vehicle.imageVehicle.map((img, index) => (
                <div key={index} className="w-full p-1">
                  <img
                    src={img}
                    alt="Vehicle Image"
                    className="w-full h-64 lg:mb-2 rounded-xl object-cover"
                  />
                </div>
              ))
            ) : (
              <p>Không có ảnh</p>
            )}
          </div>
        </div>
        <div className=" border-t-2 border-t-slate-500 mx-2 w-full flex justify-center mt-4 ">
          <div className="w-full ">
            <div className="w-full my-4 p-2 grid lg:grid-cols-2 grid-col-1 ">
              <span className="text-xl font-bold text-[#4ca771]">
                Biển số xe: <span className="font-normal">{vehicle._id}</span>
              </span>
              <span className="float-right font-bold text-xl text-[#4ca771]">
                Trạng thái:{" "}
                <span
                  className={`font-normal ${
                    vehicle.State === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {vehicle.State}
                </span>
              </span>
            </div>
            <div className="w-full p-2 grid lg:grid-cols-2 grid-col-1  ">
              <span className="text-xl font-bold text-[#4ca771]">
                Hãng xe: <span className="font-normal">{vehicle.Branch}</span>
              </span>
              <span className="text-xl font-bold text-[#4ca771]">
                Số chỗ ngồi:{" "}
                <span className="font-normal">{vehicle.Number_Seats}</span>
              </span>
            </div>
            <div className="w-full p-2 grid lg:grid-cols-2 grid-col-1 ">
              <span className="text-xl font-bold text-[#4ca771]">
                Giá: <span className="font-normal">{vehicle.Price} đ/ngày</span>
              </span>
              <span className="text-xl font-bold text-[#4ca771]">
                Mô tả:{" "}
                <span className="font-normal">{vehicle.Description}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 w-full justify-center mt-10">
          <div className="col-span-1"></div>
          <div className="col-span-5">
            <button className="bg-[#4ca771] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] p-5 rounded-lg flex items-center justify-center w-full">
              <FontAwesomeIcon icon={faEdit} />
              <Link to={`/MainAdmin/EditVehicle/${id}`} className="ml-2">
                Edit
              </Link>
            </button>
          </div>
          <div className="col-span-5">
            <button
              className="bg-[#2F4F4F] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] p-5 rounded-lg flex items-center justify-center w-full"
              onClick={() => handleDeleteVehicle(id)}
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

export default DetailVehicle;
