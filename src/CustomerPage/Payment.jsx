import Reac, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Total, setTotal] = useState(0);
  const { Name, PickupDate, ReturnDate, Price, TotalPrice, Insurance } =
    location.state || {};
  console.log(location.state);
  const [Driver, setDriver] = useState([]);
  const [DetailDriver, setDetailDriver] = useState(null);
  const [PickupDriver, setPickupDriver] = useState(null); //hàm chọn driver để thanh toán
  const URL = "https://cnpm-ncserver.vercel.app/api";
  const navigate = useNavigate();

  const fetchCalculate = async () => {
    try {
      const response = await fetch(`${URL}/CalculateContractPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pickup_Date: new Date(PickupDate),
          Return_Date: new Date(ReturnDate),
          Insurance: 82400,
          MaVehicle: id,
          MaDriver: PickupDriver,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data);
      console.log("data" + data);
      console.log("total" + Total);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (PickupDriver) {
      fetchCalculate();
    } else {
      fetchCalculate();
    }
  }, [PickupDriver]);

  const fetchDriver = async () => {
    try {
      const response = await fetch(`${URL}/GetDriverByCustomer`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDriver(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  const DetailDriverFetch = async () => {
    try {
      const res = await fetch(`${URL}/GetDriverById/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setDetailDriver(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    DetailDriverFetch();
  }, [id]);

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/PaymentContract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          baerer: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          PickupDate: PickupDate,
          ReturnDate: ReturnDate,
          MaVehicle: id,
          MaDriver: PickupDriver,
          Total_Pay: Total,
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

  if (loading) {
    return (
      <div className="text-center w-full text-4xl translate-y-1/2 h-screen font-extrabold">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center w-full text-4xl translate-y-1/2 h-screen font-extrabold">
        {error}
      </div>
    );
  }
  //   const fetchPayment = async () => {

  return (
    <div className="p-10 min-h-screen text-[#3b7097] text-lg">
      <Link
        to={`/CarDetail/${id}`}
        className="text-left py-2 px-4 cursor-pointer w-fit hover:underline flex items-center">
        <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
        Quay lại
      </Link>
      <h1 className="w-full text-5xl font-bold text-center mb-10">
        THANH TOÁN
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="w-full shadow-lg shadow-[#75bde0] rounded-xl p-10">
            <p className="text-3xl font-bold mb-2">{Name}</p>
            <p className="text-xl mb-4">{id}</p>
            <div className="grid grid-cols-2">
              <p className="font-bold">Địa điểm nhận xe:</p>
              <p className="text-right">Thành phố Hồ Chí Minh</p>
            </div>
            <p className="w-full mt-3 text-xl">
              Xe được thuê từ ngày {PickupDate} đến ngày {ReturnDate}
            </p>
            <div className="grid grid-cols-2 mt-3">
              <p className="font-bold">Đơn giá:</p>
              <p className="text-right">{Price}/Ngày</p>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <p className="font-bold">Bảo hiểm xe:</p>
              <p className="text-right">{Insurance}</p>
            </div>
          </div>

          <div className="mt-10 w-full shadow-lg shadow-[#75bde0] rounded-xl p-10">
            {PickupDriver ? (
              <div>
                <div className="mb-4 grid grid-cols-3 text-xl">
                  <p className="font-bold">Tài xế:</p>
                  <p className="text-right">{PickupDriver.NameDriver}</p>
                  <div></div>
                </div>
                <div className="mb-4 pb-4 border-b-4 border-[#75bde0] grid grid-cols-3 text-xl">
                  <p className="font-bold">Giá tiền:</p>
                  <p className="text-right">
                    {formattedPrice(PickupDriver.Price)}/Ngày
                  </p>
                  <div></div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-2 text-2xl">
              <p className="font-bold">Tổng cộng:</p>
              <p className="text-right">
                {!Total ? TotalPrice : formattedPrice(Total)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 p-6 border-8 border-l-8 border-r-0 border-[#75bde0] rounded-l-3xl">
          <h1 className="text-2xl font-bold mb-4">Chọn tài xế</h1>
          <div className="h-96 overflow-scroll overflow-x-hidden">
            {Driver.map((driver) => (
              <div
                className={`w-full grid grid-cols-12 my-2 rounded-lg ${
                  driver == PickupDriver ? "bg-[#75bde0] text-[#fff]" : ""
                } hover:bg-[#75bde0] hover:text-[#fff] cursor-pointer`}
                onClick={() => setPickupDriver(driver)}
                key={driver._id}
                value={driver.Driving_License}>
                <div className="col-span-4 rounded-lg overflow-hidden flex justify-center bg-[#75bde0]">
                  <img src={driver.Image} alt="" className="h-32 rounded-lg" />
                </div>
                <div className="col-span-8 flex items-center px-6 border-l-2 border-[#fff]">
                  <div className="w-full">
                    <p className="font-bold w-full text-center mb-4">
                      {driver.NameDriver}
                    </p>
                    <div className="grid grid-cols-2">
                      <p className="font-bold">Giá:</p>
                      <p className="text-right">
                        {formattedPrice(driver.Price)}
                      </p>
                      <div></div>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="font-bold">Số điện thoại:</p>
                      <p className="text-right">{driver.NumberPhone}</p>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setPickupDriver(null)}
            className="w-full flex items-center justify-center h-16 border-4 border-[#75bde0] rounded-xl mt-6 font-bold text-xl text-[#75bde0] hover:bg-[#75bde0] hover:text-[#fff] cursor-pointer">
            Unselect driver
          </div>
        </div>
        <button
          type="submit"
          className="col-span-8 col-start-3 bg-[#75bde0] text-white font-bold p-4 text-2xl border-8 border-[#75bde0] hover:text-[#75bde0] hover:bg-[#fff] rounded-2xl mt-2">
          Xác nhận thanh toán
        </button>
      </form>
    </div>
  );
};

export default Payment;
