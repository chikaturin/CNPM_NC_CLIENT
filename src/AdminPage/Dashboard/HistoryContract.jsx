import { useState,useEffect } from 'react'

const HistoryContract = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContract = async () => {
        try {
          const res = await fetch(`https://cnpm-ncserver.vercel.app/api/ContractByAdmin`);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          const filteredData = data.filter((item) => item.StatePay === "Paid");
          setHistory(data);
        } catch (error) {
          setError("Không thể lấy dữ liệu từ máy chủ");
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchContract();
      },[]);

      console.log(history);

      const TotalMoney = history.reduce((total, item) => total + item.Total_Pay, 0);
      const formatCurrency = Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(TotalMoney);

      console.log(TotalMoney);
  
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;
  return (
    
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen"> 
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center ">Danh sách hợp đồng đã hoàn thành thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((contract) => (
          <div
            key={contract._id}
            className="flex bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Bên trái */}
            <div className="bg-green-500 text-white p-6 flex items-center justify-center w-1/3">
              <div className="text-center font-bold">
              {contract._id}
              </div>
            </div>

            {/* Bên phải */}
            <div className="p-6 flex-1">
              
              
              <p className="text-gray-600">
                <span className="font-bold">Ngày kí kết hợp đồng:</span>{" "}
                {new Date(contract.ContractDate).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Ngày nhận xe:</span>{" "}
                {new Date(contract.Pickup_Date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Ngày trả xe:</span>{" "}
                {new Date(contract.Return_Date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Mã xe:</span> {contract.MaVehicle}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Mã tài xế:</span> {contract.MaDriver}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#C993C5] w-fit rounded-md p-5 my-5 text-xl text-white">
        Total Money: {formatCurrency}

      </div>
    </div>
  )
}

export default HistoryContract
