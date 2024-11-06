import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateVehicle = () => {
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const [Vehicle, setVehicle] = useState({
    _id: "",
    Number_Seats: "",
    VehicleName: "",
    Branch: "",
    Price: "",
    Description: "",
    ImageVehicles: [],
  });

  const [imageVehicle, setImageVehicle] = useState({ imgVehicle: "" });

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserAuth = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage:", token);

    if (token) {
      try {
        const response = await fetch(
          "https://cnpm-ncserver.vercel.app/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = await response.json();
        console.log("User data from API:", userData);

        if (response.ok) {
          setUser(userData);
          setIsLoading(false);

          Vehicle.CreateBy = user._id;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setImageVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    // if (Vehicle.ImageVehicles.length >= 3) {
    //   alert("You cann't add more than 3 conditions");
    //   return;
    // }

    if (!imageVehicle.imgVehicle) {
      alert("Please fill all the imageVehicle fields");
      return;
    }

    setVehicle((prev) => ({
      ...prev,
      ImageVehicles: [...prev.ImageVehicles, imageVehicle],
    }));

    setImageVehicle({ imgVehicle: "" });
    document.getElementById("imgVehicle").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Vehicle.CreateDate = Date.now();

    if (
      !Vehicle._id ||
      !Vehicle.Number_Seats ||
      !Vehicle.VehicleName ||
      !Vehicle.Branch ||
      !Vehicle.Price ||
      !Vehicle.Description ||
      Vehicle.ImageVehicles.length < 1
    ) {
      alert("Please fill all the fields and add at least one imageVehicle");
      return;
    }

    // if (Vehicle.ImageVehicles.length < 3) {
    //   alert("Please add at least 3 images");
    // }

    try {
      const response = await fetch(`${URL}/createVehicle`, {
        method: "POST",
        headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,

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
              <div className="col-span-5">
                <label className="font-bold">Hãng xe</label>
              </div>
              <div className="col-span-12">
                <input
                  placeholder="Nhập tên hãng"
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  value={Vehicle.Branch}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Branch: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center bg-[#c0e6ba] text-[#4ca771] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Tên xe</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  placeholder="Nhập tên xe"
                  value={Vehicle.VehicleName}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, VehicleName: e.target.value })
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
                <select
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="number"
                  // value={Vehicle.Number_Seats}
                  onChange={(e) => {
                    setVehicle({ ...Vehicle, Number_Seats: e.target.value });
                    console.log(e.target.value);
                  }}
                >
                  <option
                    value="4"
                    disabled
                    selected
                    className="text-[#2F4F4F]"
                  >
                    Chọn số chỗ ngồi
                  </option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
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
              <label className="font-bold line-clamp-1">Ảnh mô tả xe</label>
            </div>
            <div className="col-span-12">
              <input
                placeholder="Nhập link ảnh"
                className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                type="text"
                name="imgVehicle"
                id="imgVehicle"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 item-center">
            <div className="border-8 border-[#4ca771] rounded-lg h-fit">
              <div className="grid grid-cols-2 items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#2F4F4F] ml-4">
                    Images:
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
              <button
                className="bg-[#4ca771] hover:bg-[#eaf9e7] font-bold text-lg text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] p-2 rounded-lg flex items-center justify-center w-full"
                onClick={checkUserAuth()}
              >
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
