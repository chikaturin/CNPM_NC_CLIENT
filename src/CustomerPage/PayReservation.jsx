import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PayReservation = () => {
  const { id } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Total, setTotal] = useState(0);
  const { Name, PickupDate, ReturnDate, Price, TotalPrice, Insurance } =
    location.state || {};
  console.log(location.state);
  const [Driver, setDriver] = useState([]);
  // const [DetailDriver, setDetailDriver] = useState(null);
  const [PickupDriver, setPickupDriver] = useState(null); //hàm chọn driver để thanh toán
  const URL = "https://cnpm-ncserver.vercel.app/api";
  const navigate = useNavigate();

  let TotalPriceReserve = (TotalPrice * 20) / 100;
  console.log("totalpricereserve", TotalPriceReserve);

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

  // const DetailDriverFetch = async () => {
  //   try {
  //     const res = await fetch(`${URL}/GetDriverById/${id}`);
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     const data = await res.json();
  //     setDetailDriver(data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   DetailDriverFetch();
  // }, [id]);

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDateCreate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to pay?");
    if (!confirm) return;

    if (!PickupDate || !ReturnDate) {
      alert("Please provide both Pickup Date and Return Date.");
      return;
    }
    try {
      const response = await fetch(`${URL}/createVehicle_Reservation_Book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          Desired_Date: formatDateCreate(PickupDate).toISOString(),
          Return_Date: formatDateCreate(ReturnDate).toISOString(),
          MaVehicle: id,
          Price: (TotalPrice * 80) / 100,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Vehicle created successfully");
        navigate("/Home");
      } else {
        alert("Error: " + (data?.message || "Failed to create reservation"));
      }
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("An error occurred while creating the reservation.");
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
    <div className="p-10 min-h-screen bg-[#ffffff] text-[#3b7097] text-lg">
      <Link
        to={`/Reservation/${id}`}
        className="text-left py-2 px-4 cursor-pointer w-fit hover:underline flex items-center"
      >
        <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
        Quay lại
      </Link>
      <h1 className="w-full text-5xl font-bold text-center mb-10">
        THANH TOÁN
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
        <div className="col-span-2"></div>
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
                {!Total
                  ? formattedPrice(Total)
                  : formattedPrice(TotalPriceReserve)}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="col-span-8 col-start-3 bg-[#75bde0] text-white font-bold p-4 text-2xl border-8 border-[#75bde0] hover:text-[#75bde0] hover:bg-[#fff] rounded-2xl mt-2"
        >
          Xác nhận thanh toán
        </button>
      </form>
    </div>
  );
};

export default PayReservation;
