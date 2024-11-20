import { useState, useEffect } from "react";
// import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faArrowUp,
  faArrowDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Line, Pie } from "react-chartjs-2";
// import { Chart } from "chart.js/auto";

function Dashboard() {
  const [car, setCar] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectType, setType] = useState("nonSelection");
  const [fakeOrder, setOrder] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [filteredOrders, setFilteredOrders] = useState([]); // Trạng thái lưu đơn hàng đã lọc
  //Hàm xử lý khi thay đổi selection
  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  const fetchListCar = async () => {
    try {
      const res = await fetch(
        "https://cnpm-ncserver.vercel.app/api/getVehicleByAdmin"
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      setCar(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const TotalCar = car.length;

  const generateFakeOrderData = (count) => {
    const fakeOrderData = [];
    for (let i = 0; i < count; i++) {
      fakeOrderData.push({
        order: i + 1,
        cusName: `Khách hàng ${i + 1}`, // Sử dụng backticks để định dạng chuỗi
        email: `user${i + 1}@example.com`, // Email giả
        total: Math.floor(Math.random() * 1000), // Tổng tiền giả
        date: generateRandomDate("2023-01-01", "2024-12-31"), // Ngày giả trong khoảng thời gian chỉ định
      });
    }
    return fakeOrderData;
  };

  // Hàm tạo ngày giả ngẫu nhiên trong khoảng thời gian
  const generateRandomDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Tạo một timestamp ngẫu nhiên giữa start và end
    const randomTimestamp =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());

    const randomDate = new Date(randomTimestamp).toISOString().split("T")[0]; // Trả về ngày theo định dạng YYYY-MM-DD
    // console.log("Ngày giả:", randomDate); // In ra ngày giả để kiểm tra
    return randomDate;
  };

  const filterOrders = (orders, month, year) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate.getMonth() === month && orderDate.getFullYear() === year;
    });
  };

  const handleFilter = () => {
    const filteredOrders = filterOrders(fakeOrder, selectedMonth, selectedYear);
    setFilteredOrders(filteredOrders);
  };

  const seatTypes = [...new Set(car.map((item) => item.Number_Seats))].map(
    (seat) => `${seat} ghế`
  );
  const seatType = [...new Set(car.map((item) => item.Number_Seats))]; // Lấy ra mảng chứa các loại ghế không trùng lặp.
  const carCountPerSeat = seatType.map(
    (seat) => car.filter((item) => item.Number_Seats === seat).length
  ); // Đếm số lượng xe cho từng loại ghế

  const lineChartData = {
    labels: seatTypes, // Đây sẽ là các nhãn trên trục X (ví dụ: 4, 5, 7 chỗ)
    datasets: [
      {
        label: "Biểu đồ số lượng xe",
        data: carCountPerSeat,
        borderColor: "rgba(75, 192, 192, 1)", // Màu của đường line
        fill: false, // Không tô màu dưới đường line
        tension: 0.1, // Độ cong của đường line
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true, // Đảm bảo trục X bắt đầu từ 0
        min: 0, // Đặt giá trị tối thiểu cho trục X là 0
      },
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    // Ví dụ sử dụng các hàm
    const fakeData = generateFakeOrderData(100);
    console.log("Orders:", fakeData);

    setOrder(fakeData);
    fetchListCar();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <select value={selectType} onChange={handleSelectChange}>
          <option value="nonSelection">Hãy chọn loại thống kê bạn muốn</option>
          <option value="car">Thống kê xe theo từng loại</option>
          <option value="order">Thống kê đơn hàng</option>
        </select>
        <div className="grid grid-cols-4 h-[150px] gap-4">
          <div className="totalCar bg-[#5437FD] rounded-[10px] flex items-center justify-center text-white">
            <FontAwesomeIcon className="mr-2" icon={faCar} /> {TotalCar}
          </div>
          <div className="increase bg-[#00FF71] rounded-[10px] flex items-center justify-center text-white">
            <FontAwesomeIcon className="mr-2" icon={faArrowUp} /> 200
          </div>
          <div className="degree bg-[#FF0000] rounded-[10px] flex items-center justify-center text-white">
            <FontAwesomeIcon className="mr-2" icon={faArrowDown} /> 50
          </div>
          <div className="online bg-[#effe1d] rounded-[10px] flex items-center justify-center text-white">
            <FontAwesomeIcon
              className="mr-2"
              icon={faCircle}
              style={{ color: "#63E6BE" }}
            />{" "}
            200
          </div>
        </div>
        <br />
        {/* Render html dựa trên selection */}
        {selectType === "nonSelection" && (
          <div className=" border  border-black rounded  items-center p-10">
            <h1 className=" font- text-cyan-400 text-4xl font-bold  ">
              {" "}
              Vui lòng chọn loại thống kê
            </h1>
            <img src="" />
          </div>
        )}
        {selectType === "car" && (
          <div className="h-[350px] grid grid-cols-4 gap-2">
            <div className=" grid">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>

                    <th className="border border-gray-300 px-4 py-2">Số Ghế</th>
                  </tr>
                </thead>
                <tbody>
                  {car.map((vehicle, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {vehicle._id}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        {vehicle.Number_Seats}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" col-span-3 ">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        )}
        {selectType === "order" && (
          <div>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={index}>
                  Tháng {index + 1}
                </option>
              ))}
            </select>

            <label htmlFor="yearSelect">Chọn năm:</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <option key={index} value={2024 - index}>
                  {2024 - index}
                </option>
              ))}
            </select>
            <button onClick={handleFilter}>Thống kê</button>
            {filteredOrders.length > 0 ? (
              <table className="border w-full">
                <thead className="table-auto border">
                  <tr className=" bg-cyan-400">
                    <th>Order</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Tổng tiền</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order} className="border">
                      <td>{order.order}</td>
                      <td>{order.cusName}</td>
                      <td>{order.email}</td>
                      <td>{order.total} VNĐ</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>
                Không có hợp đồng nào trong tháng {selectedMonth + 1} năm{" "}
                {selectedYear}.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
