import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateVehicle = () => {
  const URL = "http://localhost:8000/api";

  const [Vehicle, setVehicle] = useState({
    _id: "",
    Number_Seats: 4,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageVehicle((prev) => ({ ...prev, imgVehicle: file }));
  };

  const addImage = () => {
    if (
      !imageVehicle.imgVehicle ||
      !(imageVehicle.imgVehicle instanceof File)
    ) {
      alert("Please select a valid image file");
      return;
    }

    setVehicle((prev) => ({
      ...prev,
      ImageVehicles: [...prev.ImageVehicles, imageVehicle.imgVehicle],
    }));

    setImageVehicle({ imgVehicle: "" });
    document.getElementById("imgVehicle").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const formdata = new FormData();
    formdata.append("_id", Vehicle._id);
    formdata.append("Number_Seats", Vehicle.Number_Seats);
    formdata.append("VehicleName", Vehicle.VehicleName);
    formdata.append("Branch", Vehicle.Branch);
    formdata.append("Price", Vehicle.Price);
    formdata.append("Description", Vehicle.Description);
    Vehicle.ImageVehicles.forEach((image) => {
      formdata.append("images", image);
    });

    try {
      const response = await fetch(`${URL}/createVehicle`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formdata,
      });

      console.log("Response status:", response.status);

      const data = await response.json(); // Chỉ đọc một lần dưới dạng JSON
      console.log("Response body:", data);

      if (response.ok) {
        alert("Vehicle created successfully");
        navigate("/MainAdmin/ListVehicle");
      } else {
        console.log("Error: " + (data?.message || "Failed to create vehicle"));
      }
    } catch (err) {
      console.error("Error creating vehicle:", err);
      alert("An error occurred while creating the vehicle");
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
                {/* <input
                  placeholder="Nhập tên hãng"
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  type="text"
                  value={Vehicle.Branch}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Branch: e.target.value })
                  }
                /> */}
                <select
                  className="border-2 border-[#c0e6ba] outline-none px-2 py-2 h-full w-full rounded-lg bg-white"
                  name=""
                  value={Vehicle.Branch}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Branch: e.target.value })
                  }
                >
                  <option value="" disabled selected>
                    Chọn hãng xe
                  </option>
                  <option value="Acura">Acura</option>
                  <option value="Audi">Audi</option>
                  <option value="BMW">BMW</option>
                  <option value="Buick">Buick</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Chrysler">Chrysler</option>
                  <option value="Dodge">Dodge</option>
                  <option value="Ferrari">Ferrari</option>
                  <option value="Ford">Ford</option>
                  <option value="GMC">GMC</option>
                  <option value="Honda">Honda</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Infiniti">Infiniti</option>
                  <option value="Jaguar">Jaguar</option>
                  <option value="Jeep">Jeep</option>
                  <option value="Kia">Kia</option>
                  <option value="Lamborghini">Lamborghini</option>
                  <option value="Land Rover">Land Rover</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Peugeot">Peugeot</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Subaru">Subaru</option>
                  <option value="Tesla">Tesla</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Volvo">Volvo</option>
                </select>
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
                    setVehicle({
                      ...Vehicle,
                      Number_Seats: Number(e.target.value),
                    });
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
                type="file"
                id="imgFile"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input outline-none file:border-0 file:rounded-full file:shadow-md file:shadow-[#ffffff] file:text-[#3b7097] file:bg-[#ffffff] w-full bg-[#a9d09e] shadow-md shadow-[#ffffff] text-[#ffffff] placeholder-[#ffffff] text-lg rounded-full"
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
                        className="w-full h-auto rounded-xl"
                        src={img}
                        alt={`Image ${index + 1}`}
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
                onClick={handleSubmit}
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
