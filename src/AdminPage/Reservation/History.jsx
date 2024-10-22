import { useState, useEffect } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(10); // Số mục trên mỗi trang (có thể thay đổi nếu cần)

  // Hàm tạo mảng chứa các hãng xe (dữ liệu mẫu)
  const ListCar = [
    { "Car": "Hyundai" },
    { "Car": "Toyota" },
    { "Car": "Mercedes" },
    { "Car": "Lamborghini" }
  ];

  const Stateorder = [
    { "State": "Đã trả xe" },
    { "State": "Chưa trả xe" }
  ];

  const generateRandomHistory = (count) => {
    const fakeHistorydata = [];
    for (let i = 0; i < count; i++) {
      const returnDate = generateRandomDate('2024-01-01', '2024-12-31'); 
      fakeHistorydata.push({
        hisID: "HD" + (i + 1),
        cusName: `Khách hàng ${i + 1}`,
        email: `user${i + 1}@example.com`, 
        bookingDate: generateRandomDate('2024-01-01', '2024-12-31'), 
        returnDate: returnDate, 
        carName: getRandomElement(ListCar).Car, 
        state: getRandomState(Stateorder, returnDate)
      });
    }
    return fakeHistorydata;
  };

  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomState = (arr, returnDate) => {
    const currentDate = new Date();
    const returnDateObj = new Date(returnDate);

    // So sánh ngày trả xe với ngày hiện tại
    if (returnDateObj > currentDate) {
      return "Quá hạn";
    } else {
      return getRandomElement(arr).State; 
    }
  };

  const generateRandomDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTimestamp).toISOString().split('T')[0]; 
    return randomDate;
  };

  useEffect(() => {
    const randomHistory = generateRandomHistory(50); 
    setHistory(randomHistory); 
  }, []);

  // Lấy dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage; // Vị trí của mục cuối cùng trên trang hiện tại
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Vị trí của mục đầu tiên trên trang hiện tại
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem); // Dữ liệu hiển thị trên trang hiện tại

  // Tạo các nút phân trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(history.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Hàm để chuyển trang

  // Hàm để xác định màu nền cho trạng thái
  const getStateBackgroundColor = (state) => {
    switch (state) {
      case "Đã trả xe":
        return "green"; 
      case "Chưa trả xe":
        return "yellow"; 
      case "Quá hạn":
        return "red"; 
      default:
        return "lightgray"; 
    }
  };

  return (
    <div>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          border: "2px solid black"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "cyan" }}>
            <th>Mã Lịch Sử</th>
            <th>Tên Khách Hàng</th>
            <th>Email</th>
            <th>Ngày Đặt Xe</th>
            <th>Ngày Trả Xe</th>
            <th>Hãng Xe</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.hisID}>
              <td>{item.hisID}</td>
              <td>{item.cusName}</td>
              <td>{item.email}</td>
              <td>{item.bookingDate}</td>
              <td>{item.returnDate}</td>
              <td>{item.carName}</td>
              <td
                style={{
                  backgroundColor: getStateBackgroundColor(item.state), // Thay đổi màu nền trạng thái
                  color: "white", 
                  fontWeight: "bold",
                  border: "1px solid black"
                }}
              >
                {item.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút phân trang */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: currentPage === number ? "blue" : "gray",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
