import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log("FULL LOGIN ERROR:", error);
      console.log("BACKEND LOGIN RESPONSE:", error.response?.data);

      alert(
        "❌ Login failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;