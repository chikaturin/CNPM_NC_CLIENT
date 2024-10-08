import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ListAccount = () => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const fetchDriver = async () => {
    try {
      const res = await fetch(`${URL}/getaccount`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAccount(data);
      console.log(account.Image);
      console.log(account);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
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
          Danh sách tài khoản
        </h1>
        <div className="grid mx-2 grid-cols-1 lg:grid-cols-2 gap-4">
          {account.map((account) => (
            <div
              key={account._id}
              className=" w-full grid grid-cols-2 rounded-lg p-4 bg-[#c0e6b3] text-[#2F4F4F]"
            >
              <img
                src={`http://localhost:8000/${account.Image}`}
                className="rounded-lg"
                alt="ảnh"
              />

              <div className="ml-2">
                <h2 className="text-2xl font-bold mb-3">{account.NameCus}</h2>
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Số điện thoại:
                      </span>{" "}
                      {account.NumberPhone}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Loại giấy tờ:{" "}
                      </span>
                      {account.TypeCard}
                    </p>
                    <p>
                      <span className="font-bold text-[#4ca771]">
                        Mã giấy tờ:{" "}
                      </span>
                      {account._id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListAccount;
