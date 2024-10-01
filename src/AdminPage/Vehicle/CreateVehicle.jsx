import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateVehicle = () => {
  const URL = "http://localhost:8000/api";

  const [Vehicle, setVehicle] = useState({
    _id: "",
    Number_Seats: "",
    Image: "",
    Branch: "",
    Price: "",
    Description: "",
    ImageVehicles: [],
  });

  const [imageVehicle, setImageVehicle] = useState({ imgVehicle: "" });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setImageVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    if (Vehicle.ImageVehicles.length >= 3) {
      alert("You cann't add more than 3 conditions");
      return;
    }

    if (!imageVehicle.imgVehicle) {
      alert("Please fill all the imageVehicle fields");
      return;
    }

    setVehicle((prev) => ({
      ...prev,
      ImageVehicles: [...prev.ImageVehicles, imageVehicle],
    }));

    setImageVehicle({ imgVehicle: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !Vehicle._id ||
      !Vehicle.Number_Seats ||
      !Vehicle.Image ||
      !Vehicle.Branch ||
      !Vehicle.Price ||
      !Vehicle.Description ||
      !Vehicle.ImageVehicles.length
    ) {
      alert("Please fill all the fields and add at least one imageVehicle");
      return;
    }

    if (Vehicle.ImageVehicles.length < 3) {
      alert("Please add at least 3 images");
    }

    try {
      const response = await fetch(`${URL}/createVehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...Vehicle,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Vehicle created successfully");
        navigate("/MainAdmin/ListVehicle");
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
          Tạo phương tiện
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Biển số xe</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập biển số xe"
                  value={Vehicle._id}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, _id: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Mô tả</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập mô tả"
                  value={Vehicle.Description}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Số chỗ ngồi</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="number"
                  value={Vehicle.Number_Seats}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Number_Seats: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Hãng xe</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập hãng xe"
                  value={Vehicle.Branch}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Branch: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Ảnh chính</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder="Nhập link ảnh chính"
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  value={Vehicle.Image}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] pl-4 rounded-lg h-12">
              <div className="col-span-5">
                <label className="font-bold">Giá tiền/Ngày</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder="Nhập số lượng"
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="number"
                  value={Vehicle.Price}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
            <div className="col-span-5">
              <label className="font-bold line-clamp-1">ảnh phụ</label>
            </div>
            <div className="col-span-12">
              <input
                placeholder="Nhập link ảnh phụ"
                className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                type="text"
                name="imgVehicle"
                value={imageVehicle.imgVehicle}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 item-center">
            <div className="border-8 border-[#4ca771] rounded-lg h-fit">
              <div className="grid grid-cols-2 items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#2F4F4F] ml-4">
                    Image:
                  </h2>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="lg:col-span-2 border-2 border-[#4ca771] bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] px-4 py-2 rounded-bl-lg"
                    onClick={addImage}
                  >
                    Add Image
                  </button>
                </div>
              </div>
              <div className="mt-5 px-4">
                <div className="grid lg:grid-cols-3 grid-cols-1">
                  {Vehicle.ImageVehicles.map((img, index) => (
                    <div
                      key={index}
                      className="mb-2 mx-2 text-[#4ca771] font-semibold"
                    >
                      <img
                        className="w-ful rounded-xl h-full"
                        src={img.imgVehicle}
                      />
                    </div>
                  ))}
                </div>
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
                to="/MainAdmin/ListVehicle"
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

export default CreateVehicle;
