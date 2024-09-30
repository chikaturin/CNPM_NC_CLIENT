import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [NumberPhone, setNumberPhone] = useState("");
  const [IDCard, setIDCard] = useState("");
  const [TypeCard, setTypeCard] = useState("");
  const [Image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const URL = "https://cnpm-nc-server.vercel.app/api";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Kiểm tra thông tin đầu vào
    if (!username || !NumberPhone || !IDCard) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setIsLoading(false);
      return;
    }

    if (IDCard.length < 8) {
      setError("IDCard phải có ít nhất 8 ký tự.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://cnpm-nc-server.vercel.app/api/register",
        {
          NameCus: username,
          IDCard,
          NumberPhone,
          TypeCard,
          Image,
        }
      );

      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        if (response.data.success) {
          setSuccess("Đăng ký thành công!");
          // window.location.href = "/MainHome";
        } else {
          setError(response.data?.message || "Đăng ký thất bại.");
        }
      } else {
        setError("Phản hồi không hợp lệ từ máy chủ.");
      }
    } catch (e) {
      console.log("Error:", e);
      setError(
        e.response?.data?.message ||
          "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
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
        <h2 className="mb-4 text-2xl text-black font-bold text-center">
          Đăng Ký
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm pb-3 font-medium text-slate-700">
                Tên
              </span>
            </label>
            <input
              placeholder="Tên của bạn"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border text-black bg-white outline-none border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm pb-3 font-medium text-slate-700">
                Số điện thoại
              </span>
            </label>
            <input
              type="tel"
              value={NumberPhone}
              placeholder="Số điện thoại"
              onChange={(e) => setNumberPhone(e.target.value)}
              className="w-full px-3 py-2 border text-black bg-white outline-none border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm pb-3 font-medium text-slate-700">
                Hình ảnh
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              value={Image}
              onChange={(e) => setImage(e.target.value)}
              className="file-input file-input-bordered text-black file-input-info w-full border-gray-300 bg-white outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm pb-3 font-medium text-slate-700">
                Loại giấy tờ
              </span>
            </label>
            <select
              id="documentType"
              className="select select-bordered w-full bg-white"
              value={TypeCard}
              onChange={(e) => setTypeCard(e.target.value)}
            >
              <option value="">--Chọn--</option>
              <option value="CĂN CƯỚC CÔNG DÂN">CĂN CƯỚC CÔNG DÂN</option>
              <option value="HỘ CHIẾU">HỘ CHIẾU</option>
              <option value="CHỨNG MINH NHÂN DÂN">CHỨNG MINH NHÂN DÂN</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mã định danh
              </span>
              <input
                type="IDCard"
                value={IDCard}
                onChange={(e) => setIDCard(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border text-black rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Mã định danh của bạn"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Bạn đã có tài khoản?
            <a href="/" className="text-blue-500 px-2 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mb-4 text-center text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
