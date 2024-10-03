import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateDriver = () => {
  const URL = "http://localhost:8000/api";

  const [Driver, setDriver] = useState({
    NameDriver: "",
    NumberPhone: "",
    Driving_License: "",
    Image: "",
    Price: "",
    Vehicle_ID: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !Driver.NameDriver ||
      !Driver.NumberPhone ||
      !Driver.Driving_License ||
      !Driver.Image ||
      !Driver.Price ||
      !Driver.Vehicle_ID
    ) {
      alert("Please fill all the fields ");
      return;
    }

    try {
      const response = await fetch(`${URL}/CreateDriver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...Driver,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Driver created successfully");
        navigate("/MainAdmin/ListDriver");
      } else {
        alert("Error: " + (data?.message || "Failed to create voucher"));
      }
    } catch (err) {
      console.error("Error creating voucher:", err);
      alert("An error occurred while creating the voucher");
    }
  };

  return (
    <div className="lg:bg-[#eaf9e7] bg-[#4ca771]">
      <div className="w-full bg-[#eaf9e7] p-4 px-10 rounded-t-xl">
        <h1 className="text-4xl text-[#2F4F4F] mb-10 mt-4 w-full text-center font-bold">
          Tạo tài xế
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Tên tài xế</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập tên tài xế"
                  value={Driver.NameDriver}
                  onChange={(e) =>
                    setDriver({ ...Driver, NameDriver: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Số điện thoại</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={Driver.NumberPhone}
                  onChange={(e) =>
                    setDriver({ ...Driver, NumberPhone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Bằng lái</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập bằng lái"
                  value={Driver.Driving_License}
                  onChange={(e) =>
                    setDriver({ ...Driver, Driving_License: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Giá tiền </label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập giá"
                  value={Driver.Price}
                  onChange={(e) =>
                    setDriver({ ...Driver, Price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Ảnh </label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder="Nhập link ảnh "
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  value={Driver.Image}
                  onChange={(e) =>
                    setDriver({ ...Driver, Image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Sở hữu xe</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder="Nhập biển số xe"
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  value={Driver.Vehicle_ID}
                  onChange={(e) =>
                    setDriver({ ...Driver, Vehicle_ID: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-12 gap-10 w-full justify-center">
            <div className="col-span-1"></div>
            <div className="col-span-5">
              <button className="bg-[#4ca771] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] p-2 rounded-lg flex items-center justify-center w-full">
                Create
              </button>
            </div>
            <div className="col-span-5">
              <Link
                to="/MainAdmin/ListDriver"
                className="bg-[#2F4F4F] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#2F4F4F] border-2 border-[#2F4F4F] p-2 rounded-lg flex items-center justify-center w-full"
              >
                Back
              </Link>
            </div>
            <div className="col-span-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDriver;
