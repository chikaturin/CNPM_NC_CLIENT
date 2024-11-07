import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api"; // URL of the server

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${URL}/getVehicleByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const moneyFormat = (money) =>
    money.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
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
    <div className="grid grid-cols-12 bg-[#75bde0] min-h-screen p-20 gap-y-5">
      <div className="col-start-2 col-span-10 grid grid-cols-12 w-full bg-[#ffffff] rounded-3xl py-10 text-[#3b7097] h-fit">
        <div className="col-span-5">
          <h1 className="text-7xl font-extrabold bg-[#75bde0] px-10 py-4 rounded-r-2xl text-center">
            RENT CAR <br /> GLOBALLY
          </h1>
          <p className="mt-10 text-lg pl-10 font-semibold text-[#3aafa9]">
            Our website offers professional car rental services with a wide
            range of vehicles, from economy to luxury cars. We ensure a quick,
            easy, and affordable rental experience, with 24/7 customer support
            to meet all your transportation needs. Rent with us for a safe and
            convenient journey!
          </p>
        </div>
        <div className="col-span-7 relative">
          <h1
            className="text-7xl font-extrabold text-center text-[#3aafa9]"
            id="carTitle">
            Variety of Cars for you to choose
          </h1>
          <img
            src="https://i.pinimg.com/originals/e6/fa/ba/e6faba7761e789db2aa96d5988a6bc22.png"
            alt=""
            className="w-full absolute -bottom-36 -right-24"
            id="carImg"
            onMouseOver={() => {
              document.getElementById("carImg").src =
                "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png";
              document
                .getElementById("carTitle")
                .classList.add("text-[#FFD700]");
              document
                .getElementById("carTitle")
                .classList.remove("text-[#3aafa9]");
            }}
            onMouseLeave={() => {
              document.getElementById("carImg").src =
                "https://i.pinimg.com/originals/e6/fa/ba/e6faba7761e789db2aa96d5988a6bc22.png";
              document
                .getElementById("carTitle")
                .classList.remove("text-[#FFD700]");
              document
                .getElementById("carTitle")
                .classList.add("text-[#3aafa9]");
            }}
          />
        </div>
      </div>
      <div className="col-span-12">
        <h1 className="w-full text-center text-5xl font-extrabold text-[#3b7097] mt-16">
          Chương trình khuyến mãi
        </h1>
      </div>
      <div className="col-start-2 col-span-10 grid grid-cols-3 gap-4 w-full bg-[#ffffff] rounded-3xl px-10 pb-10 text-[#2b7a78] h-fit">
        <div className="col-span-3 w-full text-center text-xl font-bold mt-4 text-[#3aafa9]">
          <p>Ưu đãi mới đến từ CARental</p>
        </div>
        <img
          src="https://willertrip.com/vn/vn/campaign/promotion/img/trending_item01.jpg"
          alt=""
          className="w-full rounded-2xl shadow-lg shadow-[#3aafa9]"
        />
        <img
          src="https://bizweb.dktcdn.net/100/419/736/files/khuyen-mai-he-giam-50-percentage-thue-truoc-ba-thang-6-hrv-600x900.jpg?v=1623721789789"
          alt=""
          className="w-full rounded-2xl shadow-lg shadow-[#3aafa9]"
        />
        <img
          src="https://image.bnews.vn/MediaUpload/Org/2023/12/02/honda-kv-promotion-t12-ver4-01-20231202185257.jpg"
          alt=""
          className="w-full rounded-2xl shadow-lg shadow-[#3aafa9]"
        />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-12">
        <h1 className="w-full text-center text-5xl font-extrabold text-[#3b7097] mt-16">
          Danh sách xe cho thuê
        </h1>
      </div>
      <div className="col-span-1">{console.log(vehicles)}</div>
      <div className="col-span-10 grid grid-cols-4 gap-6 w-full bg-[#ffffff] rounded-3xl p-6 text-[#2b7a78] h-fit">
        {vehicles.map(
          (vehicle, i) =>
            i < 4 && (
              <Link
                to={`/CarDetail/${vehicle._id}`}
                key={vehicle._id}
                className=" w-full rounded-2xl p-4 bg-[#f3f3f3] text-[#3b7097] shadow-xl shadow-[#75bde0]">
                <img
                  src={vehicle.images[0].ImageVehicle}
                  className="rounded-xl h-1/2 w-full"
                />
                <h2 className="text-xl font-bold mb-3 line-clamp-1">
                  {vehicle.Branch}
                </h2>
                <div className="bottom-0">
                  <p className="text-lg">Xe {vehicle.Number_Seats} chổ</p>
                  <p className="my-2">
                    <span className="font-bold mr-6">Biển số: </span>
                    {vehicle._id}
                  </p>
                  <div className="w-full border-4 border-[#ffffff] rounded-full my-2"></div>
                  <p className="flex justify-between">
                    <span className="text-[#daa520]">
                      <FontAwesomeIcon className="mr-2" icon={faStar} />
                      5.0
                    </span>
                    <span>
                      <span className="font-bold">{vehicle.Price}</span>/ngày
                    </span>
                  </p>
                </div>
              </Link>
            )
        )}
        <div className="col-span-4 w-full flex items-center justify-end text-lg text-[#3b7097] font-semibold mt-4">
          <Link
            to="/CarList"
            className="py-2 px-4 cursor-pointer hover:bg-[#75bde0] hover:text-[#ffffff] rounded-full">
            Xem tất cả
            <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
          </Link>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Home;
