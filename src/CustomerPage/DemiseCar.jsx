import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DemiseCar = () => {
  const URL = "https://cnpm-ncserver.vercel.app/api";

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
  const [mainImg, setMainImg] = useState(null);

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
        navigate("/Home");
      } else {
        alert("Error: " + (data?.message || "Failed to create voucher"));
      }
    } catch (err) {
      console.error("Error creating voucher:", err);
      alert("An error occurred while creating the voucher");
    }
  };

  return (
    <div
      id="overBg"
      className="bg-gradient-to-r from-[#f6e2bc] to-[#75bde0] transition-colors ease-in-out p-10"
    >
      <div className="w-full bg-[#f6e2bc] p-4 px-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl text-[#3b7097] mb-10 mt-4 w-full text-center font-bold">
          Đăng ký cho thuê xe
        </h1>
        <form onSubmit={handleSubmit} className="relative overflow-hidden">
          <div id="carRegister">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                <div className="col-span-12">
                  <label className="font-bold">Biển số xe</label>
                </div>
                <div className="col-span-12">
                  <input
                    className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                    type="text"
                    placeholder="Nhập biển số xe"
                    value={Vehicle._id}
                    onChange={(e) =>
                      setVehicle({ ...Vehicle, _id: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                <div className="col-span-12">
                  <label className="font-bold">Tên xe</label>
                </div>
                <div className="col-span-12">
                  <input
                    className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                    type="text"
                    placeholder="Nhập tên xe"
                    value={Vehicle.Branch}
                    onChange={(e) =>
                      setVehicle({ ...Vehicle, Branch: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Mô tả</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                  type="text"
                  placeholder="Nhập mô tả sơ lược xe"
                  value={Vehicle.Description}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="w-full h-full">
                <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                  <div className="col-span-5">
                    <label className="font-bold">Ảnh chính</label>
                  </div>
                  <div className="col-span-12">
                    <input
                      placeholder="Nhập link ảnh chính"
                      className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                      type="text"
                      value={Vehicle.Image}
                      onChange={(e) => {
                        setVehicle({ ...Vehicle, Image: e.target.value });
                        setMainImg(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-10">
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-12">
                      <label className="font-bold">Số chỗ ngồi</label>
                    </div>
                    <div className="col-span-12">
                      <input
                        className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                        type="number"
                        value={Vehicle.Number_Seats}
                        placeholder="Nhập số chỗ ngồi"
                        onChange={(e) =>
                          setVehicle({
                            ...Vehicle,
                            Number_Seats: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-5">
                      <label className="font-bold">Giá tiền/Ngày</label>
                    </div>
                    <div className="col-span-12">
                      <input
                        placeholder="Nhập số tiền"
                        className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                        type="number"
                        value={Vehicle.Price}
                        onChange={(e) =>
                          setVehicle({ ...Vehicle, Price: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                  <div className="col-span-12">
                    <label className="font-bold line-clamp-1">ảnh phụ</label>
                  </div>
                  <div className="col-span-12 grid grid-cols-12">
                    <input
                      placeholder="Nhập link ảnh phụ"
                      className="col-span-9 border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-l-lg bg-[#f6e2bc]"
                      type="text"
                      name="imgVehicle"
                      value={imageVehicle.imgVehicle}
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      className="col-span-3 border-2 border-[#75bde0] bg-[#75bde0] border-l-0 hover:bg-[#f6e2bc] font-semibold text-[#f6e2bc] hover:text-[#75bde0] px-4 py-2 rounded-r-lg"
                      onClick={addImage}
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <img src={mainImg} alt="" className="rounded-xl" />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-10 item-center">
              <div className="border-8 border-[#75bde0] rounded-lg h-fit py-2">
                <h2 className="text-xl font-bold text-[#3b7097] ml-4">
                  Sub image:
                </h2>
                <div className="mt-2 px-4">
                  <div className="grid lg:grid-cols-3 grid-cols-1">
                    {Vehicle.ImageVehicles.map((img, index) => (
                      <div key={index} className="mb-2 mx-2">
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
                  type="submit"
                  // onClick={() => {
                  //   document
                  //     .getElementById("driverRegister")
                  //     .classList.remove("translate-x-[200%]");
                  // }}
                  className="bg-[#75bde0] hover:bg-[#f6e2bc] cursor-pointer font-bold text-lg text-[#f6e2bc] hover:text-[#75bde0] border-2 border-[#75bde0] p-2 rounded-lg flex items-center justify-center w-full"
                >
                  Cho thuê
                </button>
              </div>
              <div className="col-span-5">
                <Link
                  to="/Home"
                  className="bg-[#3b7097] hover:bg-[#f6e2bc] cursor-pointer font-bold text-lg text-[#f6e2bc] hover:text-[#3b7097] border-2 border-[#3b7097] p-2 rounded-lg flex items-center justify-center w-full"
                >
                  Quay về
                </Link>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div
            id="driverRegister"
            className="absolute top-0 w-full bg-[#f6e2bc] translate-x-[200%] transition-all ease-in-out duration-1000 rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                <div className="col-span-12">
                  <label className="font-bold">Biển số xe</label>
                </div>
                <div className="col-span-12">
                  <input
                    className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                    type="text"
                    placeholder="Nhập biển số xe"
                    value={Vehicle._id}
                    onChange={(e) =>
                      setVehicle({ ...Vehicle, _id: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                <div className="col-span-12">
                  <label className="font-bold">Tên xe</label>
                </div>
                <div className="col-span-12">
                  <input
                    className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                    type="text"
                    placeholder="Nhập tên xe"
                    value={Vehicle.Branch}
                    onChange={(e) =>
                      setVehicle({ ...Vehicle, Branch: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
              <div className="col-span-12">
                <label className="font-bold">Mô tả</label>
              </div>
              <div className="col-span-12">
                <input
                  className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                  type="text"
                  placeholder="Nhập mô tả sơ lược xe"
                  value={Vehicle.Description}
                  onChange={(e) =>
                    setVehicle({ ...Vehicle, Description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="w-full h-full">
                <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                  <div className="col-span-5">
                    <label className="font-bold">Ảnh chính</label>
                  </div>
                  <div className="col-span-12">
                    <input
                      placeholder="Nhập link ảnh chính"
                      className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                      type="text"
                      value={Vehicle.Image}
                      onChange={(e) => {
                        setVehicle({ ...Vehicle, Image: e.target.value });
                        setMainImg(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-10">
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-12">
                      <label className="font-bold">Số chỗ ngồi</label>
                    </div>
                    <div className="col-span-12">
                      <input
                        className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                        type="number"
                        value={Vehicle.Number_Seats}
                        onChange={(e) =>
                          setVehicle({
                            ...Vehicle,
                            Number_Seats: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-5">
                      <label className="font-bold">Giá tiền/Ngày</label>
                    </div>
                    <div className="col-span-12">
                      <input
                        placeholder="Nhập số lượng"
                        className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#f6e2bc]"
                        type="number"
                        value={Vehicle.Price}
                        onChange={(e) =>
                          setVehicle({ ...Vehicle, Price: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-12 items-center bg-gradient-to-l from-[#f6e2bc] to-[#75bde0] text-[#f6e2bc] py-1 pl-4 rounded-lg h-12">
                  <div className="col-span-12">
                    <label className="font-bold line-clamp-1">ảnh phụ</label>
                  </div>
                  <div className="col-span-12 grid grid-cols-12">
                    <input
                      placeholder="Nhập link ảnh phụ"
                      className="col-span-9 border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-l-lg bg-[#f6e2bc]"
                      type="text"
                      name="imgVehicle"
                      value={imageVehicle.imgVehicle}
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      className="col-span-3 border-2 border-[#75bde0] bg-[#75bde0] border-l-0 hover:bg-[#f6e2bc] font-semibold text-[#f6e2bc] hover:text-[#75bde0] px-4 py-2 rounded-r-lg"
                      onClick={addImage}
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <img src={mainImg} alt="" className="rounded-xl" />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-10 item-center">
              <div className="border-8 border-[#75bde0] rounded-lg h-fit py-2">
                <h2 className="text-xl font-bold text-[#3b7097] ml-4">
                  Sub image:
                </h2>
                <div className="mt-2 px-4">
                  <div className="grid lg:grid-cols-3 grid-cols-1">
                    {Vehicle.ImageVehicles.map((img, index) => (
                      <div key={index} className="mb-2 mx-2">
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
                <button className="bg-[#75bde0] hover:bg-[#f6e2bc] font-bold text-lg text-[#f6e2bc] hover:text-[#75bde0] border-2 border-[#75bde0] p-2 rounded-lg flex items-center justify-center w-full">
                  Xác nhận
                </button>
              </div>
              <div className="col-span-5">
                <div className="bg-[#3b7097] hover:bg-[#f6e2bc] font-bold text-lg text-[#f6e2bc] hover:text-[#3b7097] border-2 border-[#3b7097] p-2 rounded-lg flex items-center justify-center w-full">
                  Quay về
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemiseCar;
