import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DetailContract = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const DetailFetch = async () => {
    try {
      const res = await fetch(`${URL}/GetContractById/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("data:", data);
      setContract(data);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const date = (a) => {
    return new Date(a).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    DetailFetch();
  }, [id]);

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
    <div className="lg:bg-[#eaf9e7] bg-[#4ca771]">
      <div className="w-full bg-[#eaf9e7] p-4 rounded-t-xl">
        <div className="grid grid-cols-12 text-[#4ca771]">
          <div className="col-span-11 flex items-center">
            <span className="text-4xl flex mt-4 mb-10 w-full text-left font-bold px-10">
              Chi tiết hợp đồng
            </span>
          </div>
          <div className="col-span-1 flex items-center ">
            <Link to={`/MainAdmin/ListContract`}>
              <button className="bg-[#eaf9e7] hover:bg-[#4ca771] w-10 h-10 border-4 border-[#4ca771] hover:text-[#eaf9e7] font-bold rounded-full">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full text-[#2F4F4F]">
          <div className="w-full border-b border-[#4ca771] mb-10">
            <span className="text-xl text-[#4ca771]">{contract._id}</span>
            <span className="float-right font-bold text-xl text-[#4ca771]">
              Trạng thái:{" "}
              <span
                className={`font-normal ${
                  contract.StatePay === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {contract.StatePay}
              </span>
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
          <div className="w-full">
            <div className="w-full text-[#2F4F4F]">
              <div>
                <p className="text-xl my-2 flex justify-between pr-10">
                  <span className="font-bold text-[#4ca771]">
                    Ngày đăng ký hợp đồng:{" "}
                  </span>
                  {date(contract.ContractDate) || "N/A"}
                </p>
                <p className="text-xl my-2 flex justify-between pr-10">
                  <span className="font-bold text-[#4ca771]">Ngày đặt: </span>
                  {date(contract.Pickup_Date) || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full text-[#2F4F4F]">
              <div>
                <p className="text-xl my-2 flex justify-between pr-10">
                  <span className="font-bold text-[#4ca771]">Ngày trả: </span>
                  {date(contract.Return_Date) || "N/A"}
                </p>
                <p className="text-xl my-2 flex justify-between pr-10">
                  <span className="font-bold text-[#4ca771]">Tổng tiền: </span>
                  {contract.Total_Pay || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className={`w-full text-[#2F4F4F] ${
                contract.MaDriver ? "block" : "hidden"
              }`}
            >
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">Mã tài xế: </span>
                {contract.MaDriver || "N/A"}
              </p>
            </div>
          </div>
          <div className="w-full text-[#2F4F4F]">
            <div>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">Mã xe: </span>
                {contract.MaVehicle || "N/A"}
              </p>
              <p className="text-xl my-2 flex justify-between pr-10">
                <span className="font-bold text-[#4ca771]">
                  Mã Khách hàng:{" "}
                </span>
                {contract.MaKH || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContract;
