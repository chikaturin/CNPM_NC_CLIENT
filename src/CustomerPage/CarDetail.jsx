import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faStar,
  faGears,
  faCouch,
  faGasPump,
  faOilCan,
  faShieldHalved,
  faFlag,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DetailVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [Null, setNull] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [insurance] = useState(82400);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const formatDate = (a) => {
    return new Date(a).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const OnclickPay = (e) => {
    e.preventDefault();

    if (!date) {
      setNull("Vui lòng chọn ngày trả xe");
    } else if (new Date(date) < new Date()) {
      setNull("Ngày trả xe không hợp lệ");
    } else {
      navigate(`/Payment/${id}`, {
        state: {
          Pickup_Date: new Date().toLocaleDateString(),
          Return_Date: formatDate(date),
        },
      });
    }
  };

<<<<<<< HEAD
=======
  const fetchCalculate = async () => {
    try {
      const response = await fetch(`${URL}/CalculateContractPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pickup_Date: new Date(),
          Return_Date: new Date(date),
          Insurance: insurance,
          MaVehicle: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (date) {
      fetchCalculate();
    }
  }, [date]);

  const fetchCalendar = async () => {
    try {
      const response = await fetch(`${URL}/dateContract/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const datefetch = data.date;
      if (datefetch != null) {
        const [day, month, year] = datefetch.split("/");
        const formattedDate = new Date(`${year}-${month}-${day}`);
        setEndDate(formattedDate);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const toggleCalendar = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setShow(!show);
  };

>>>>>>> 7d5b5fd ("Updated date parsing logic in DetailVehicle function to handle null date values")
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const formatDate = (a) => {
    return new Date(a).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const OnclickPay = (e) => {
    e.preventDefault();

    if (!date) {
      setNull("Vui lòng chọn ngày trả xe");
    } else if (new Date(date) < new Date()) {
      setNull("Ngày trả xe không hợp lệ");
    } else {
      navigate(`/Payment/${id}`, {
        state: {
          Pickup_Date: new Date().toLocaleDateString(),
          Return_Date: formatDate(date),
        },
      });
    }
  };

  const DetailFetch = async () => {
    try {
      const res = await fetch(`${URL}/DetailVehicle/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setVehicle(data);
    } catch (e) {
      setError("Không thể lấy dữ liệu từ máy chủ");
      console.error("Error fetching data: ", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCalculate = async () => {
    try {
      const response = await fetch(`${URL}/CalculateContractPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pickup_Date: new Date().toLocaleDateString(),
          Return_Date: date,
          MaVehicle: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const today = new Date();
    const selectedDate = new Date(date);

    if (date && selectedDate < today) {
      setNull("Ngày trả xe không hợp lệ");
      setDate(null);
      setTotal(0);
    } else if (date) {
      setNull(null);
      fetchCalculate();
    }
  }, [date]);

  useEffect(() => {
    DetailFetch();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center w-full text-4xl translate-y-1/2 h-screen font-extrabold">
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
    <div className="grid grid-cols-12 bg-gradient-to-bl to-[#75bde0] from-30% from-[#ffffff]">
      <div className="col-span-10 col-start-2 w-full py-6">
        <div className="grid grid-cols-12 text-[#3b7097]">
          <div className="col-span-12 flex items-center justify-between px-2 my-4">
            <div>
              <div className="bg-transparent w-10 h-10 border-4 border-transparent text-transparent font-bold rounded-full"></div>
            </div>
            <span className="text-5xl flex w-fit text-left">
              <span className="font-bold mr-2 lg:flex hidden">Chi tiết xe</span>
              {vehicle._id}
            </span>
            <Link to={`/Home`}>
              <button className="bg-[#ffffff] hover:bg-[#3b7097] w-10 h-10 border-4 border-[#3b7097] hover:text-[#ffffff] font-bold rounded-full">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <img
            className="w-full rounded-xl h-full object-cover"
            src={vehicle.imageVehicle[0]}
            alt="Vehicle"
          />
          <div className="grid grid-cols-3 grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 gap-4 w-full">
            {vehicle.imageVehicle && vehicle.imageVehicle.length > 0 ? (
              vehicle.imageVehicle.map((img, index) =>
                index === 1 ? (
                  <img
                    key={index}
                    src={img}
                    alt="Vehicle Image"
                    className="w-full h-64 rounded-xl object-cover"
                  />
                ) : null
              )
            ) : (
              <p>Không có ảnh</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 w-full mt-10 rounded-lg text-[#ffffff]">
          <div className="w-full col-span-8">
            <h1 className="font-bold text-5xl [text-shadow:_0_4px_8px_#2b7a78]">
              {vehicle.Branch}
            </h1>
            <p className="text-lg mt-2">
              <FontAwesomeIcon className="mr-2 text-[#daa520]" icon={faStar} />
              5.0 • Hồ Chí Minh
            </p>
            <div className="my-6 py-6 border-y-2 border-[#ffffff]">
              <p className="text-3xl font-semibold mb-6">Đặc điểm</p>
              <div className="grid grid-cols-4">
                <div className="grid grid-cols-12 text-xl">
                  <p className="col-span-3 flex items-center justify-center">
                    <FontAwesomeIcon
                      className="mr-2 text-[#2b7a78]"
                      icon={faGears}
                    />
                  </p>
                  <p className="col-span-9 grid grid-rows-2">
                    <p className="flex items-center justify-start">
                      Truyền động
                    </p>
                    <p className="flex items-center justify-start font-bold">
                      Số tự động
                    </p>
                  </p>
                </div>
                <div className="grid grid-cols-12 text-xl">
                  <p className="col-span-3 flex items-center justify-center">
                    <FontAwesomeIcon
                      className="mr-2 text-[#2b7a78]"
                      icon={faCouch}
                    />
                  </p>
                  <p className="col-span-9 grid grid-rows-2">
                    <p className="flex items-center justify-start">
                      Số chỗ ngồi
                    </p>
                    <p className="flex items-center justify-start font-bold">
                      {vehicle.Number_Seats}
                    </p>
                  </p>
                </div>
                <div className="grid grid-cols-12 text-xl">
                  <p className="col-span-3 flex items-center justify-center">
                    <FontAwesomeIcon
                      className="mr-2 text-[#2b7a78]"
                      icon={faGasPump}
                    />
                  </p>
                  <p className="col-span-9 grid grid-rows-2">
                    <p className="flex items-center justify-start">
                      Nhiên liệu
                    </p>
                    <p className="flex items-center justify-start font-bold">
                      Xăng
                    </p>
                  </p>
                </div>
                <div className="grid grid-cols-12 text-xl">
                  <p className="col-span-3 flex items-center justify-center">
                    <FontAwesomeIcon
                      className="mr-2 text-[#2b7a78]"
                      icon={faOilCan}
                    />
                  </p>
                  <p className="col-span-9 grid grid-rows-2">
                    <p className="flex items-center justify-start">
                      Mức tiêu hao
                    </p>
                    <p className="flex items-center justify-start font-bold">
                      100L/10KM
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-3xl font-semibold mb-6">Mô tả</p>
              <p className="text-[#2b7a78]">{vehicle.Description}</p>
            </div>
          </div>
          <div className="col-span-4 grid gap-6 text-[#3b7097]">
            <div className="bg-[#ffffff] rounded-xl grid grid-cols-12 p-2">
              <div className="col-span-2 flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-5xl text-[#2b7a78]"
                  icon={faShieldHalved}
                />
              </div>
              <div className="col-span-10 w-full grid grid-rows-2">
                <p className="flex items-center text-xl text-[#2b7a78] p-0">
                  Bảo hiểm thuê xe
                </p>
                <p className="flex items-center text-sm p-0">
                  Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa
                  2.000.000 VNĐ trong trường hợp có sự cố ngoài ý muốn.
                </p>
              </div>
            </div>
            <form onSubmit={() => {}} className="bg-[#ffffff] rounded-xl p-4">
              <p className="font-semibold text-lg mb-4">
                <span className="text-3xl">
                  {formattedPrice(vehicle.Price)}
                </span>
                /ngày
              </p>
              <div className="grid grid-cols-2 text-[#ffffff] text-md">
                <div className="rounded-l-lg shadow-xl shadow-[#75bde0] p-4">
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#ffffff] to-[#75bde0] text-[#ffffff] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-5">
                      <label className="font-bold">Nhận xe</label>
                    </div>
                    <div className="col-span-12 mt-3 w-full">
                      <span className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] py-[0.65rem] pr-14 px-2 h-full w-full rounded-lg bg-[#ffffff]">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-r-lg shadow-xl shadow-[#75bde0] p-4">
                  <div className="grid grid-cols-12 items-center bg-gradient-to-l from-[#ffffff] to-[#75bde0] text-[#ffffff] py-1 pl-4 rounded-lg h-12">
                    <div className="col-span-5">
                      <label className="font-bold">Trả xe</label>
                    </div>
                    <div className="col-span-12">
                      <input
                        placeholder="Nhập số lượng"
                        className="border-2 border-[#75bde0] outline-none text-[#3b7097] placeholder:text-[#75bde0] px-2 py-2 h-full w-full rounded-lg bg-[#ffffff]"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      {Null && <p className="text-red-500">{Null}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 rounded-lg shadow-xl shadow-[#75bde0] p-4">
                <p>Địa điểm giao xe</p>
                <p className="text-xl font-bold mt-2">Thành phố Hồ Chí Minh</p>
              </div>
              <div className="my-5 rounded-lg border border-[#75bde0]"></div>
              <div className="w-full grid grid-cols-2 text-lg">
                <div className="w-full">
                  <p>Đơn giá:</p>
                  <p className="mt-2">Bảo hiểm xe:</p>
                  <p className="mt-4 text-xl">Tổng cộng:</p>
                </div>
                <div className="w-full text-right font-bold">
                  <p>{formattedPrice(vehicle.Price)}/Ngày</p>
                  <p className="mt-2">{formattedPrice(insurance)}/Ngày</p>
                  <p className="mt-4 text-xl">
                    {formattedPrice(vehicle.Price + insurance)}/Ngày
                  </p>
                </div>
              </div>
              <div className="my-5 rounded-lg border border-[#75bde0]"></div>
              <div className="w-full grid grid-cols-2 text-xl font-bold">
                <p>Thành tiền:</p>
                <p className="text-right">{formattedPrice(total)}</p>
              </div>
              <button
                onClick={OnclickPay}
                type="submit"
                className="mt-10 w-full text-center py-4 cursor-pointer shadow-lg shadow-[#75bde0] text-xl font-bold text-[#ffffff] hover:text-[#75bde0] bg-[#75bde0] hover:bg-[#ffffff] rounded-xl"
              >
                Chọn thuê
              </button>
            </form>
            <div className="bg-[#ffffff] rounded-xl p-4">
              <p className="text-xl font-semibold text-[#2b7a78]">
                Phụ phí có thể phát sinh
              </p>
              <div className="grid grid-cols-12 w-full my-4">
                <div className="col-span-1">
                  <FontAwesomeIcon
                    className="text-[#2b7a78]"
                    icon={faCircleInfo}
                  />
                </div>
                <div className="col-span-6 font-bold">Phí vượt giới hạn</div>
                <div className="col-span-5 font-bold text-right">5 000đ/km</div>
                <div className="col-span-11 col-start-2">
                  Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 370km khi
                  thuê xe 1 ngày
                </div>
              </div>
              <div className="grid grid-cols-12 w-full my-4">
                <div className="col-span-1">
                  <FontAwesomeIcon
                    className="text-[#2b7a78]"
                    icon={faCircleInfo}
                  />
                </div>
                <div className="col-span-6 font-bold">Phí quá giờ</div>
                <div className="col-span-5 font-bold text-right">80 000đ/h</div>
                <div className="col-span-11 col-start-2">
                  Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá
                  5 giờ, phụ phí thêm 1 ngày thuê
                </div>
              </div>
              <div className="grid grid-cols-12 w-full my-4">
                <div className="col-span-1">
                  <FontAwesomeIcon
                    className="text-[#2b7a78]"
                    icon={faCircleInfo}
                  />
                </div>
                <div className="col-span-6 font-bold">Phí vệ sinh</div>
                <div className="col-span-5 font-bold text-right">80 000đ</div>
                <div className="col-span-11 col-start-2">
                  Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiều
                  vết bẩn, bùn cát, sình lầy...)
                </div>
              </div>
              <div className="grid grid-cols-12 w-full my-4">
                <div className="col-span-1">
                  <FontAwesomeIcon
                    className="text-[#2b7a78]"
                    icon={faCircleInfo}
                  />
                </div>
                <div className="col-span-6 font-bold">Phí khử mùi</div>
                <div className="col-span-5 font-bold text-right">300 000đ</div>
                <div className="col-span-11 col-start-2">
                  Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi
                  thuốc lá, thực phẩm nặng mùi...)
                </div>
              </div>
            </div>
            <div className="text-[#2b7a78] font-semibold text-lg cursor-pointer rounded-xl flex items-center justify-center">
              <p className=" hover:text-[#ffffff] hover:underline">
                <FontAwesomeIcon className="mr-2" icon={faFlag} />
                Báo cáo xe này
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVehicle;
