import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Reset failed"
      );
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border mb-4 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;