import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(name, email, password);

      alert("✅ Registration successful!");

      navigate("/login");
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("BACKEND RESPONSE:", error.response?.data);

  alert(
    "❌ Registration failed: " +
    (error.response?.data?.message || "Unknown error")
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;