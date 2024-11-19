import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faXmark,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Hello
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
      <div className="w-full bg-[#eaf9e7] p-20 rounded-t-xl">
        <div className="grid grid-cols-12 text-[#4ca771] mb-10">
          <div className="col-span-1 flex items-center ">
            <Link to={`/MainAdmin/ListContract`}>
              <button className="bg-[#eaf9e7] hover:bg-[#4ca771] w-10 h-10 border-4 border-[#4ca771] hover:text-[#eaf9e7] font-bold rounded-full">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </Link>
          </div>
          <div className="col-span-10 flex items-center">
            <span className="text-4xl mt-4 mb-10 w-full text-center font-bold px-10">
              Chi tiết hợp đồng
            </span>
          </div>
        </div>
        <div className="w-full text-[#2F4F4F]">
          <div className="w-full mb-10 flex">
            <p className="w-full text-right border-b border-[#4ca771] font-bold text-xl text-[#4ca771]">
              {/* Trạng thái:{" "}
              <span
                className={`font-normal ${
                  contract.StatePay === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}>
                {contract.StatePay}
              </span> */}
            </p>
            <p className="w-1/4 text-center text-3xl font-bold text-[#4ca771]">
              {contract._id}
            </p>
          </div>
        </div>
        {/* <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
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
              }`}>
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
        </div> */}
        <div className="w-full grid grid-cols-12 gap-8 text-[#4ca771] text-lg">
          <div className="col-span-8 pr-12 grid h-fit gap-6">
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Bên cho thuê: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                CARent
              </p>
            </div>
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Bên thuê: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                Khách hàng {contract.MaKH || "N/A"}
              </p>
            </div>
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Biển số xe: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                {contract.MaVehicle || "N/A"}
              </p>
            </div>
            <p className="font-bold mt-6">Thời hạn thuê xe</p>
            <div className="w-full grid grid-cols-2 gap-20">
              <div className="w-full flex">
                <p className="w-full font-bold">Từ ngày: </p>
                <p className="w-full border-b border-[#4ca771] text-[#2F4F4F]">
                  {date(contract.Pickup_Date) || "N/A"}
                </p>
              </div>
              <div className="w-full flex">
                <p className="w-full font-bold">Đến ngày: </p>
                <p className="w-full border-b border-[#4ca771] text-[#2F4F4F]">
                  {date(contract.Return_Date) || "N/A"}
                </p>
              </div>
            </div>
            <p className="font-bold mt-6">Thông tin thanh toán</p>
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Phương thức: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                Giao dịch qua ngân hàng
              </p>
            </div>
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Tổng tiền: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                {contract.Total_Pay.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                }) || "N/A"}
              </p>
            </div>
            <div className="w-full flex">
              <p className="w-1/4 font-bold">Trạng thái: </p>
              <p className="w-full text-right border-b border-[#4ca771] text-[#2F4F4F]">
                {contract.StatePay === "Paid"
                  ? "Đã thanh toán toàn bộ"
                  : "Đã cọc 50%"}
              </p>
            </div>
            <p className="font-bold mt-6">Quyền và nghĩa vụ của các bên</p>
            <p className="w-full">
              {" "}
              - Bên cho thuê có quyền yêu cầu bên thuê bảo quản xe cẩn thận và
              đúng mục đích sử dụng. Bên thuê có trách nhiệm thanh toán đầy đủ
              và đúng hạn tiền thuê xe.
            </p>
            <p className="w-full">
              {" "}
              - Bên thuê chịu trách nhiệm bảo dưỡng định kỳ xe và báo ngay cho
              bên cho thuê nếu xe gặp sự cố. Mọi chi phí sửa chữa phát sinh do
              lỗi của bên thuê sẽ do bên thuê chi trả.
            </p>
            <p className="w-full">
              {" "}
              - Nếu bên thuê vi phạm các điều khoản trong hợp đồng, bên cho thuê
              có quyền đơn phương chấm dứt hợp đồng và yêu cầu bồi thường thiệt
              hại.
            </p>
            <p className="font-bold w-full">
              Hợp đồng chấm dứt khi hết thời hạn thuê hoặc khi hai bên thỏa
              thuận chấm dứt bằng văn bản. Bên thuê phải trả lại xe trong tình
              trạng ban đầu, ngoại trừ hao mòn tự nhiên.
            </p>
          </div>
          <div className="col-span-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048359.png"
              alt=""
            />
            <p className="w-full font-bold mt-10">Xác nhận của bên thuê</p>
            <p className="text-base">(Ký và ghi rõ họ tên)</p>
            <p className="w-full text-center mt-10">
              {" "}
              {date(contract.ContractDate) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContract;
