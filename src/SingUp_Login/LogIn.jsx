import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
  const [username, setUserName] = useState("");
  const [NumberPhone, setNumberPhone] = useState("");
  const [IDCard, setIDCard] = useState("");
  const [TypeCard, setTypeCard] = useState("");
  const [Image, setImage] = useState(null);
  const [PasswordRegis, setPasswordRegis] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const URL = "https://cnpm-ncserver.vercel.app/api";

  const changePanel = () => {
    {
      document.getElementById("toSignUp").classList.remove("hidden");
      document.getElementById("toLogin").classList.add("hidden");
      document.getElementById("coverPanel").classList.add("translate-x-full");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

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

    const formData = new FormData();
    formData.append("NameCus", username);
    formData.append("IDCard", IDCard);
    formData.append("NumberPhone", NumberPhone);
    formData.append("TypeCard", TypeCard);
    formData.append("file", Image);
    formData.append("Password", PasswordRegis);
    try {
      const response = await axios.post(`${URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        if (response.data.success) {
          setSuccess("Đăng ký thành công!");
          changePanel();
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

  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!Name || !Password) {
      setError("Vui lòng nhập tên và mật khẩu!");
      return;
    }

    try {
      const response = await axios.post(`${URL}/signin`, {
        Name,
        Password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        const res = await fetch(`${URL}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await res.json();
        const userRole = userData.role;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", userRole);

        setSuccess("Đăng nhập thành công!");

        if (userRole === "Admin") {
          navigate("/MainAdmin/Dashboard");
        } else if (userRole === "Customer") {
          navigate("/Home");
        } else {
          navigate("/Login");
        }
      } else {
        throw new Error("Đăng nhập không thành công.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Có lỗi xảy ra trong quá trình đăng nhập."
        );
      } else {
        setError("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-2">
      <div className="p-6 flex items-center bg-gradient-to-b from-[#ffffff] from-60% to-[#75bde0]">
        <div className="w-full px-20">
          <h2 className="mb-40 text-[#3b7097] text-5xl font-bold text-center">
            Login to your account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <input
                type="text"
                value={Name}
                // minLength={8}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-3 bg-[#ffffff] shadow-md shadow-[#75bde0] text-[#3b7097] placeholder-[#75bde0] outline-none text-lg rounded-full"
                placeholder="Tên của bạn"
                required
              />
            </div>
            <div className="mb-10">
              <input
                type="password"
                value={Password}
                // minLength={8}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-4 w-full px-6 py-3 bg-[#ffffff] shadow-md shadow-[#75bde0] text-[#3b7097] placeholder-[#75bde0] outline-none text-lg rounded-full"
                placeholder="Mật khẩu"
                required
              />
            </div>
            <div className="w-full px-20">
              <button
                type="submit"
                className="w-full py-4 font-bold border-4 border-[#75bde0] text-[#ffffff] text-lg bg-[#75bde0] hover:bg-[#ffffff] hover:text-[#75bde0] rounded-2xl">
                {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          {success &&
            document.getElementById("toSignUp") &&
            document.getElementById("toSignUp").style.display === "hidden" && (
              <p className="mt-4 text-center text-green-500">{success}</p>
            )}
        </div>
      </div>
      <div className="p-6 flex items-center bg-gradient-to-b to-[#ffffff] from-[#a9d09e]">
        <img
          src="https://png.pngtree.com/png-vector/20220913/ourmid/pngtree-palm-tree-leaf-drawing-vector-forground-png-image_6173238.png"
          alt=""
          className="absolute top-0 right-0"
        />
        <div className="w-full px-20">
          <h2 className="mb-32 text-[#3b7097] text-5xl font-bold text-center">
            Create a new account
          </h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <input
                placeholder="Tên của bạn"
                type="text"
                value={username}
                minLength={8}
                maxLength={20}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-6 py-3 bg-[#a9d09e] shadow-lg shadow-[#ffffff] text-[#3b7097] placeholder-[#ffffff] outline-none text-lg rounded-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                value={NumberPhone}
                minLength={10}
                maxLength={11}
                placeholder="Số điện thoại"
                onChange={(e) => setNumberPhone(e.target.value)}
                className="w-full px-6 py-3 bg-[#a9d09e] shadow-lg shadow-[#ffffff] text-[#3b7097] placeholder-[#ffffff] outline-none text-lg rounded-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                id="imgFile"
                accept="image/*"
                onChange={(e) => {
                  if (
                    document.getElementById("imgFile").files[0].size >
                    1024 * 1024
                  ) {
                    alert("File quá lớn, vui lòng chọn file dưới 5MB");
                    document.getElementById("imgFile").value = null;
                  } else {
                    setImage(e.target.files[0]);
                  }
                }}
                className="file-input outline-none file:border-0 file:rounded-full file:shadow-md file:shadow-[#ffffff] file:text-[#3b7097] file:bg-[#ffffff] w-full bg-[#a9d09e] shadow-md shadow-[#ffffff] text-[#ffffff] placeholder-[#ffffff] text-lg rounded-full"
              />
            </div>
            <div className="mb-4">
              <select
                id="documentType"
                className="select w-full px-6 bg-[#ffffff] shadow-md shadow-[#a9d09e] text-[#3b7097] placeholder-[#a9d09e] outline-none text-lg rounded-full"
                value={TypeCard}
                onChange={(e) => setTypeCard(e.target.value)}>
                <option value="">--Chọn loại giấy tờ--</option>
                <option value="CĂN CƯỚC CÔNG DÂN">CĂN CƯỚC CÔNG DÂN</option>
                <option value="HỘ CHIẾU">HỘ CHIẾU</option>
                <option value="CHỨNG MINH NHÂN DÂN">CHỨNG MINH NHÂN DÂN</option>
                <option value="GIẤY PHÉP LÁI XE">GIẤY PHÉP LÁI XE</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="IDCard"
                value={IDCard}
                minLength={12}
                maxLength={12}
                onChange={(e) => setIDCard(e.target.value)}
                className="w-full px-6 py-3 bg-[#ffffff] shadow-md shadow-[#a9d09e] text-[#3b7097] placeholder-[#a9d09e] outline-none text-lg rounded-full"
                placeholder="Mã định danh của bạn"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={PasswordRegis}
                minLength={8}
                maxLength={20}
                onChange={(e) => setPasswordRegis(e.target.value)}
                className="w-full px-6 py-3 bg-[#ffffff] shadow-md shadow-[#a9d09e] text-[#3b7097] placeholder-[#a9d09e] outline-none text-lg rounded-full"
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#3b7097]">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={ConfirmPassword}
                minLength={8}
                maxLength={20}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-3 bg-[#ffffff] shadow-md shadow-[#a9d09e] text-[#3b7097] placeholder-[#a9d09e] outline-none text-lg rounded-full"
                placeholder="Confirm Password"
                required
              />
              {PasswordRegis !== ConfirmPassword && ConfirmPassword && (
                <p className="text-red-500 m-2 mx-4 font-bold">
                  Mật khẩu không khớp
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 font-bold border-4 border-[#a9d09e] text-[#ffffff] text-lg bg-[#a9d09e] hover:bg-[#ffffff] hover:text-[#a9d09e] rounded-2xl"
              disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
            {/* <p className="mt-4 text-sm text-center text-gray-600">
              Bạn đã có tài khoản?
              <a href="/" className="text-blue-500 px-2 hover:underline">
                Đăng nhập
              </a>
            </p> */}
          </form>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          {success && (
            <p className="mb-4 text-center text-green-500">{success}</p>
          )}
        </div>
      </div>
      <div
        id="coverPanel"
        className="text-[#3b7097] bg-gradient-to-bl from-[#ffffff] to-[#a9d09e] flex items-center absolute h-screen w-1/2 translate-x-full transition duration-1000 ease-in-out">
        <div className="w-full px-48" id="toSignUp">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/923/543/original/blue-car-logo-png.png"
            alt=""
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold mb-10">Welcome Back!</h1>
          <p className="text-xl">
            Haven't got an account?{" "}
            <a
              onClick={() => {
                document.getElementById("toSignUp").classList.add("hidden");
                document.getElementById("toLogin").classList.remove("hidden");
                document
                  .getElementById("coverPanel")
                  .classList.remove("translate-x-full");
              }}
              className="font-bold hover:text-[#ffffff] cursor-pointer">
              Sign up
            </a>
          </p>
        </div>
        <div className="w-full px-48 hidden" id="toLogin">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/923/543/original/blue-car-logo-png.png"
            alt=""
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold mb-10">Hello New Comer!</h1>
          <p className="text-xl">
            Already have an account?{" "}
            <a
              onClick={() => changePanel()}
              className="font-bold hover:text-[#ffffff] cursor-pointer">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
