import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Author = () => {
  const [NameCus, setEmail] = useState("");
  const [IDCard, setIDCard] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = "https://cnpm-nc-server.vercel.app/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!NameCus || !IDCard) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/signin`, {
        NameCus: NameCus,
        IDCard,
      });

      if (response.status === 200) {
        const token = response;
        console.log(token);
        localStorage.setItem("token", token);

        setSuccess("Đăng nhập thành công!");
        // window.location.href = "/MainHome";
      } else {
        throw new Error("Đăng nhập không thành công.");
      }
    } catch (error) {
      setError("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div
      className="flex items-center justify-center py-9 min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4N3x8ZW58MHx8fHx8')",
      }}
    >
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-black text-2xl font-bold text-center">
          Đăng Nhập
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Name
              </span>
              <input
                type="NameCus"
                value={NameCus}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border text-black rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Your name"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mật khẩu
              </span>
              <input
                type="IDCard"
                value={IDCard}
                onChange={(e) => setIDCard(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border text-black rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Mã số định danh cá nhân của bạn(CCCD)"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Đăng Nhập
          </button>
          <span className="text-red-500">
            <Link to="/SignUp">bạn chưa có tài khoản, Đăng ký</Link>
          </span>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mt-4 text-center text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};

export default Author;
