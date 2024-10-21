import { useState } from "react";

const Profile = () => {
    const [profile] = useState({
        _id: "12345",
        NameCus: "Nguyễn Văn A",
        NumberPhone: "0123456789",
        IDCard: "123456789",
        TypeCard: "CMND",
        Image: "https://via.placeholder.com/150", // URL ảnh giả lập
      });
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Profile Information
      </h2>

      <div className="mb-4 flex justify-center">
        <img
          src={profile.Image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <div className="space-y-4">
        {/* ID */}
        <div>
          <label
            htmlFor="_id"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            type="text"
            id="_id"
            name="_id"
            value={profile._id}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>

        {/* Tên khách hàng */}
        <div>
          <label
            htmlFor="NameCus"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="NameCus"
            name="NameCus"
            value={profile.NameCus}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="NumberPhone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="NumberPhone"
            name="NumberPhone"
            value={profile.NumberPhone}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>

        {/* CMND/CCCD */}
        <div>
          <label
            htmlFor="IDCard"
            className="block text-sm font-medium text-gray-700"
          >
            ID Card
          </label>
          <input
            type="text"
            id="IDCard"
            name="IDCard"
            value={profile.IDCard}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>

        {/* Loại thẻ */}
        <div>
          <label
            htmlFor="TypeCard"
            className="block text-sm font-medium text-gray-700"
          >
            Type of Card
          </label>
          <input
            type="text"
            id="TypeCard"
            name="TypeCard"
            value={profile.TypeCard}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default Profile
