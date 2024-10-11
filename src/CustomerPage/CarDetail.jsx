import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

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
    <div className="grid grid-cols-12 bg-gradient-to-bl to-[#75bde0] from-30% from-[#f6e2bc]">
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
              <button className="bg-[#f6e2bc] hover:bg-[#3b7097] w-10 h-10 border-4 border-[#3b7097] hover:text-[#f6e2bc] font-bold rounded-full">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <img
            className="w-full rounded-xl h-full object-cover"
            src={vehicle.Image}
            alt="Vehicle"
          />
          <div className="grid grid-cols-3 grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 gap-4 w-full">
            {vehicle.imageVehicle && vehicle.imageVehicle.length > 0 ? (
              vehicle.imageVehicle.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Vehicle Image"
                  className="w-full h-64 rounded-xl object-cover"
                />
              ))
            ) : (
              <p>Không có ảnh</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 w-full mt-10 rounded-lg text-[#f6e2bc]">
          <div className="w-full col-span-8">
            <h1 className="font-bold text-5xl">{vehicle.Branch}</h1>
            <p className="text-lg mt-2">
              <FontAwesomeIcon className="mr-2 text-[#daa520]" icon={faStar} />
              5.0 • Hồ Chí Minh
            </p>
            <div className="my-6 py-6 border-y-2 border-[#f6e2bc]">
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
                      ?L/10KM
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-3xl font-semibold mb-6">Điều khoản</p>
              <p>{vehicle.Description}</p>
            </div>
          </div>
          <div className="col-span-4 grid gap-6 text-[#3b7097]">
            <div className="bg-[#f6e2bc] rounded-xl grid grid-cols-12 p-2">
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
            <div className="bg-[#f6e2bc] rounded-xl p-4">
              <p className="font-semibold text-lg mb-4">
                <span className="text-3xl">{vehicle.Price}đ</span>/ngày
              </p>
              <div className="grid grid-cols-2 text-[#f6e2bc] text-md">
                <div className="rounded-l-lg border border-[#f6e2bc] bg-[#3b7097] p-4">
                  <p>Nhận xe</p>
                </div>
                <div className="rounded-r-lg border border-[#f6e2bc] bg-[#3b7097] p-4">
                  <p>Trả xe</p>
                </div>
              </div>
              <div className="font-bold text-[#3b7097] text-center mt-10">
                FORM THUÊ XE
              </div>
            </div>
            <div className="bg-[#f6e2bc] rounded-xl p-4">
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
              <p className=" hover:text-[#f6e2bc] hover:underline">
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
