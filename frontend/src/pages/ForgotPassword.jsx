import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/forgot-password",
        { email }
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
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
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border mb-4 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;