import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

const EditVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "http://localhost:8000/api";

  const DetailFetch = async () => {
    try {
      console.log(id);
      const res = await fetch(`${URL}/DetailVehicle/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
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
      Price: vehicle.Price || data.Price,
      Description: vehicle.Description || data.Description,
      State: vehicle.State || data.State,
    };

    try {
      const res = await fetch(`${URL}/updateVehicle/${id}`, {
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
      navigate("/MainAdmin/ListVehicle");
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
      <div className="w-full bg-[#eaf9e7] p-4 px-10 rounded-t-xl">
        <h1 className="text-4xl text-[#2F4F4F] mb-10 mt-4 w-full text-center font-bold">
          Sửa thông tin phương tiện
        </h1>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <img
            className="w-full mx-2 rounded-xl h-full object-cover"
            src={data.Image}
            alt="Vehicle"
          />
          <div className="ml-2 grid grid-cols-3 lg:block w-full">
            {data.imageVehicle && data.imageVehicle.length > 0 ? (
              data.imageVehicle.map((img, index) => (
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
        <div className=" border-t-2 border-t-slate-500 mx-2 w-full flex justify-center mt-6 pt-4 ">
          <div className="w-full ">
            <div className="w-full p-2 grid lg:grid-cols-2 grid-col-1  ">
              <span className="text-xl font-bold text-[#4ca771]">
                Hãng xe: <span className="font-normal">{data.Branch}</span>
              </span>
              <span className="text-xl font-bold pl-4 text-[#4ca771]">
                Số ghế: <span className="font-normal">{data.Number_Seats}</span>
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-2 gap-10 w-full justify-center px-2">
            <span className="float-right font-bold text-xl px-2 text-[#4ca771]">
              Trạng thái:{" "}
              <span
                className={`font-normal ${
                  data.State === "Available" ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.State}
              </span>
            </span>

            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] mb-2 pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Trạng thái</label>
              </div>
              <div className="col-span-12">
                <select
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  onChange={(e) =>
                    setVehicle({ ...vehicle, State: e.target.value })
                  }
                >
                  <option value={data.State}>{data.State}</option>
                  <option value="Available" hidden={data.State === "Available"}>
                    Available
                  </option>
                  <option
                    value="Unavailable"
                    hidden={data.State === "Unavailable"}
                  >
                    Unavailable
                  </option>
                </select>
              </div>
            </div>

            <label className="block p-2">
              <span className="text-xl font-bold text-[#4ca771]">
                Giá cũ: <span className="font-normal">{data.Price} đ/ngày</span>
              </span>
            </label>
            <div className="grid grid-cols-12 items-center mb-2 bg-[#c0e6ba] text-[#4ca771] pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Giá tiền/Ngày</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder={data.Price}
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-4 h-full w-full rounded-lg bg-white"
                  type="number"
                  onChange={(e) =>
                    setVehicle({ ...vehicle, Price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full p-2  ">
              <label className="block">
                <span className="text-xl font-bold text-[#4ca771]">
                  Mô tả: <span className="font-normal">{data.Description}</span>
                </span>
              </label>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Mô tả</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder={data.Description}
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-10 h-full w-full rounded-lg bg-white"
                  type="text"
                  onChange={(e) =>
                    setVehicle({ ...vehicle, Description: e.target.value })
                  }
                />
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
              <Link to={"/MainAdmin/ListVehicle"}>
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

export default EditVehicle;
