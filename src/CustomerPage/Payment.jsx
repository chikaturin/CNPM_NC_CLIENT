import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const { Pickup_Date, Return_Date } = location.state || {};

  return (
    <div>
      <p>
        {id} - {Pickup_Date}-{Return_Date}
      </p>
    </div>
  );
};

export default Payment;
