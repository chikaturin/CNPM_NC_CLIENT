import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ListContract = () => {
  const [contract, setContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api";
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSort = async (selectedState) => {
    try {
      if (selectedState == "All") {
        fetchContract();
        setOpenDropdown(false);
        return;
      }
      const res = await fetch(`${URL}/HistoryContractByAdmin/${selectedState}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setContract(data);
      setOpenDropdown(false);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const fetchContract = async () => {
    try {
      const res = await fetch(`${URL}/ContractByAdmin`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
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
    fetchContract();
  }, []);

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
      <div className="w-full bg-[#eaf9e7] rounded-t-xl p-4">
        <h1 className="text-4xl text-[#2F4F4F] mb-4 w-full text-center font-bold">
          Danh sách contract
        </h1>
        <div className="flex justify-between my-2 h-fit w-full p-2">
          <div className={`dropdown ${openDropdown ? "dropdown-open" : ""}`}>
            <div
              tabIndex={0}
              role="button"
              className="font-semibold bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] outline-none px-4 py-2 rounded-lg"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <FontAwesomeIcon className="mr-2" icon={faFilter} /> Sort by state
            </div>
            {openDropdown && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#eaf9e7] rounded-box z-[1] w-52 p-2 shadow-inner shadow-[#4ca771] mt-2"
              >
                <li
                  key="All"
                  className="flex items-center text-[#2F4F4F] text-lg"
                >
                  <a
                    onClick={() => handleSort("All")}
                    className="w-full hover:bg-[#4ca771] hover:text-[#eaf9e7] bg-[#eaf9e7] active:font-bold border-2 border-transparent active:border-[#4ca771]"
                  >
                    All
                  </a>
                </li>
                <li
                  key="Staked"
                  className="flex items-center text-[#2F4F4F] text-lg"
                >
                  <a
                    onClick={() => handleSort("Staked")}
                    className="w-full hover:bg-[#4ca771] hover:text-[#eaf9e7] bg-[#eaf9e7] active:font-bold border-2 border-transparent active:border-[#4ca771]"
                  >
                    Staked
                  </a>
                </li>
                <li
                  key="Paid"
                  className="flex items-center text-[#2F4F4F] text-lg"
                >
                  <a
                    onClick={() => handleSort("Paid")}
                    className="w-full hover:bg-[#4ca771] hover:text-[#eaf9e7] bg-[#eaf9e7] active:font-bold border-2 border-transparent active:border-[#4ca771]"
                  >
                    Paid
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="grid mx-2 grid-cols-1 lg:grid-cols-2 gap-4">
          {contract.map((contract) => (
            <div
              key={contract._id}
              className=" w-full rounded-lg p-4 bg-[#c0e6b3] text-[#2F4F4F]"
            >
              <h2 className="text-2xl font-bold mb-3">{contract._id}</h2>
              <div className="grid grid-cols-12">
                <div className="col-span-8">
                  <p>
                    <span className="font-bold text-[#4ca771]">Ngày đặt: </span>
                    {contract.Pickup_Date ? date(contract.Pickup_Date) : "N/A"}
                  </p>
                  <p>
                    <span className="font-bold text-[#4ca771]">Ngày trả: </span>
                    {contract.Return_Date ? date(contract.Return_Date) : "N/A"}
                  </p>
                  <p>
                    <span className="font-bold text-[#4ca771]">Giá tiền: </span>
                    {contract.Total_Pay}
                  </p>
                  <p className="font-bold text-[#4ca771]">
                    Trạng thái xe:{" "}
                    <span
                      className={` font-bold ${
                        contract.StatePay === "Paid"
                          ? "text-[#388046]"
                          : "text-[#ff5303]"
                      }`}
                    >
                      {contract.StatePay}
                    </span>
                  </p>
                </div>
                <div className="col-span-4 grid grid-rows-2 gap-2">
                  <Link
                    to={`/MainAdmin/DetailContract/${contract._id}`}
                    className="bg-[#4ca771] hover:bg-[#eaf9e7] text-[#eaf9e7] hover:text-[#4ca771] border-2 border-[#4ca771] px-4 py-2 rounded-lg flex items-center"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faCircleInfo} />
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListContract;
