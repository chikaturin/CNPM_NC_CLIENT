import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCar,
  faArrowUp,
  faArrowDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driver, setDriver] = useState([]); // Khởi tạo mảng dữ liệu tài xế
  const [contact, setContact] = useState([]); // Khởi tạo mảng dữ liệu hợp đồng
  const [car, setCar] = useState([]); // Khởi tạo mảng dữ liệu xe
  const [selected, setSelected] = useState("nonSelection"); // Khởi tạo giá trị ban đầu của dropdown

  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  ); // Khởi tạo giá trị ban đầu của dropdown tháng
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // Khởi tạo giá trị ban đầu của dropdown năm
  const [year, setYear] = useState([]); // Khởi tạo mảng dữ liệu năm

  const [filteredDataCar, setFilteredDataCar] = useState([]); // Khởi tạo mảng dữ liệu xe sau khi lọc
  const [filteredDataContact, setFilteredDataContact] = useState([]); // Khởi tạo mảng dữ liệu hợp đồng sau khi lọc
  const [filteredDataDriver, setFilteredDataDriver] = useState([]); // Khởi tạo mảng dữ liệu tài xế sau khi lọc

  const URL = "https://cnpm-ncserver.vercel.app/api"; // URL of the server

  const TotalCar = car.length;
  const TotalDriver = driver.length;

  //Viết hàm tính tổng số xe có sẵn
  const totalAvailableCar = () => {
    return car.filter((item) => item.State === "Available").length;
  };

  const tempA = totalAvailableCar();

  //Viết hàm tính tổng số xe không có sẵn
  const totalUnavailableCar = () => {
    return car.filter((item) => item.State === "Unavailable").length;
  };

  const tempB = totalUnavailableCar();

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${URL}/getVehicleByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setCar(data);
      const uniqueYears = [
        ...new Set(data.map((item) => new Date(item.CreateDate).getFullYear())),
      ];
      setYear(uniqueYears);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  console.log(year);

  useEffect(() => {
    fetchVehicles();
  }, []);

  console.log(car);
  //Lọc dữ liệu được truyền vào theo tháng và năm
  const filterCar = () => {
    const filteredCar = car.filter((item) => {
      const date = new Date(item.CreateDate || item.Date);
      const matchesMonthYear =
        date.getMonth() + 1 === parseInt(selectedMonth) &&
        date.getFullYear() === parseInt(selectedYear);
      return matchesMonthYear;
    });
    setFilteredDataCar(filteredCar);
  };
  console.log(filteredDataCar);

  useEffect(() => {
    filterCar();
  }, [car, selectedMonth, selectedYear]);

  const countVehicleByBranch = () => {
    return filteredDataCar.reduce((acc, item) => {
      acc[item.Branch] = (acc[item.Branch] || 0) + 1;
      return acc;
    }, {});
  };

  const lineChartCar = {
    labels: Object.keys(countVehicleByBranch()),
    datasets: [
      {
        label: "Số lượng xe của mỗi hãng",
        data: Object.values(countVehicleByBranch()),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#000000",
        },
      },
      y: {
        ticks: {
          color: "#000000",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#000000",
        },
      },
    },
  };

  const fetchDrivers = async () => {
    try {
      const res = await fetch(`${URL}/GetDriverByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDriver(data);
      const uniqueYears = [
        ...new Set(data.map((item) => new Date(item.Date).getFullYear())),
      ];
      setYear(uniqueYears);
    } catch (error) {
      setError("Không thể lấy dữ liệu tài xế từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch(`${URL}/ContractByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDriver(data);
      const uniqueYears = [
        ...new Set(data.map((item) => new Date(item.Date).getFullYear())),
      ];
      setYear(uniqueYears);
    } catch (error) {
      setError("Không thể lấy dữ liệu hợp đồng từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

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

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const filterDriver = () => {
    if (driver.length === 0) return;

    const filtered = driver.filter((item) => {
      const Date = new Date(item.Date);
      const matchesMonthYear =
        (!selectedMonth || Date.getMonth() + 1 === parseInt(selectedMonth)) &&
        (!selectedYear || Date.getFullYear() === parseInt(selectedYear));
      return matchesMonthYear;
    });
    setFilteredDataDriver(filtered);
  };

  console.log(filteredDataDriver);
  const filterContact = () => {
    if (contact.length === 0) return;

    const filtered = contact.filter((item) => {
      const Date = new Date(item.Date);
      const matchesMonthYear =
        (!selectedMonth || Date.getMonth() + 1 === parseInt(selectedMonth)) &&
        (!selectedYear || Date.getFullYear() === parseInt(selectedYear));
      return matchesMonthYear;
    });
    setFilteredDataContact(filtered);
  };

  console.log(filteredDataContact);

  return (
    <div className="min-h-screen">
      <select
        value={selected}
        onChange={handleSelect}
        className=" text-md h-full w-full text-center font-bold text-lg mb-5   "
      >
        <option value="nonSelection">Hãy chọn loại thống kê bạn muốn</option>
        <option value="car">Thống kê xe theo từng loại</option>
        <option value="order">Thống kê doanh thu và đơn hàng</option>
      </select>

      {selected === "nonSelection" && (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="border-4 rounded-lg p-4 items-center flex justify-center flex-col">
            <p className="py-2 m-4 text-2xl font-bold">
              Vui lòng chọn loại thống kê bạn muốn
            </p>
            <img
              className="h-20 w-20"
              src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Cursor-Select-icon.png"
              alt="Cursor Select Icon"
            />
          </div>
        </div>
      )}

      {selected === "car" && (
        <>
          <div>
            <div className="grid grid-cols-4 h-[150px] gap-2 w-full">
              <div>
                <div className=" w-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tổng số xe hiện có
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-4xl font-bold text-blue-600">
                      {TotalCar}
                    </p>
                    <p className="text-sm text-gray-500">Số lượng xe</p>
                  </div>
                </div>
              </div>
              <div>
                <div className=" w-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tổng số xe đang hoạt động
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-4xl font-bold text-blue-600">{tempA}</p>
                    <p className="text-sm text-gray-500">Số lượng xe</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tổng số xe không hoạt động
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-4xl font-bold text-blue-600">{tempB}</p>
                    <p className="text-sm text-gray-500">Số lượng xe</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tổng số tài xế
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-4xl font-bold text-blue-600">
                      {TotalDriver}
                    </p>
                    <p className="text-sm text-gray-500">Số lượng tài xế</p>
                  </div>
                </div>
              </div>
              <select
                value={selectedMonth}
                className="text-md h-full w-full text-center font-bold text-lg mb-5   "
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  filterCar();
                }}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                className="text-md h-full w-full text-center font-bold text-lg mb-5   "
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  filterCar();
                }}
              >
                {year.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {filteredDataCar.length > 0 ? (
              <div className="h-[500px] pt-20">
                <div className="flex justify-center h-full w-full">
                  <Bar data={lineChartCar} options={options} />
                </div>
              </div>
            ) : (
              <div className="text-center w-full text-4xl translate-y-1/2 h-full font-extrabold mt-20">
                Không có dữ liệu
              </div>
            )}
          </div>
        </>
      )}


      {selected === "order" && (
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              filterCar();
            }}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              filterCar();
            }}
          >
            {year.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      <br />
    </div>
  );
};

export default Dashboard;
