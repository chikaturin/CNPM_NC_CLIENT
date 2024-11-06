import Reac, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Total, setTotal] = useState(0);
  const { PickupDate, ReturnDate, Insurance } = location.state || {};
  const [Driver, setDriver] = useState([]);
  const [DetailDriver, setDetailDriver] = useState(null);
  const [PickupDriver, setPickupDriver] = useState(null); //hàm chọn driver để thanh toán
  const URL = "https://cnpm-ncserver.vercel.app/api";
  const navigate = useNavigate();

  const fetchCalculate = async () => {
    try {
      let response = await fetch(`${URL}/CalculateContractPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PickupDate,
          ReturnDate,
          Insurance,
          MaVehicle: id,
          MaDriver: PickupDriver,
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
    <div>
      <p>
        {id} - {PickupDate}-{ReturnDate}-{Insurance}
      </p>
    </div>
  );
};

export default Payment;
