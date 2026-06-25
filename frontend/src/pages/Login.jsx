import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { motion } from "framer-motion";

import {
  FcGoogle,
} from "react-icons/fc";

import {
  FaFacebookF,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(
        email,
        password
      );

      alert(
        "✅ Login successful!"
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      alert(
        "❌ Login failed: " +
        (error.response?.data
          ?.message ||
          "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin =
    async () => {

      try {

        const user =
          await googleLogin();

        console.log(user);

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        alert(
          "Google Login Failed"
        );
      }
    };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-blue-600
      via-indigo-700
      to-purple-700
      flex
      items-center
      justify-center
      p-6
      relative
      overflow-hidden
    "
    >
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl bottom-0 right-0" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          w-full
          max-w-5xl
          bg-white/10
          backdrop-blur-2xl
          rounded-3xl
          overflow-hidden
          shadow-2xl
          grid
          md:grid-cols-2
        "
      >
        {/* Left Side */}

        <div
          className="
            hidden
            md:flex
            flex-col
            justify-center
            p-10
            text-white
          "
        >
          <h1 className="text-5xl font-bold mb-4">
            Smart Rental
          </h1>

          <p className="text-lg text-blue-100">
            Find your dream home,
            manage bookings and
            explore properties
            seamlessly.
          </p>
        </div>

        {/* Right Side */}

        <div className="bg-white p-10">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to continue
          </p>

          {/* Social */}

          <div className="space-y-3 mb-6">

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
    w-full
    border
    rounded-xl
    py-3
    flex
    justify-center
    items-center
    gap-3
    hover:bg-gray-50
  "
            >
              <FcGoogle />
              Continue with Google
            </button>

            <button className="w-full border rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-gray-50">
              <FaFacebookF />
              Continue with Facebook
            </button>

          </div>

          <div className="text-center text-gray-400 mb-6">
            OR
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                border
                focus:ring-4
                focus:ring-blue-200
              "
            />

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={
                  password
                }
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  focus:ring-4
                  focus:ring-blue-200
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                "
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

            <p className="text-center">
              Don't have an
              account?
              <Link
                to="/register"
                className="text-blue-600 ml-2"
              >
                Register
              </Link>
            </p>
          </form>

        </div>
      </motion.div>
    </div>
  );
}

export default Login;