import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

function Register() {
const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;

    if (
      /[A-Z]/.test(password)
    )
      score++;

    if (
      /[0-9]/.test(password)
    )
      score++;

    if (
      /[^A-Za-z0-9]/.test(
        password
      )
    )
      score++;

    return score;
  };

  const strength =
    getPasswordStrength();

  const strengthText = [
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];

  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await register(
        name,
        email,
        password
      );

      alert(
        "✅ Registration successful!"
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        "❌ Registration failed: " +
          (error.response?.data
            ?.message ||
            "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
  try {
    const user = await googleLogin();

    console.log(user);

    navigate("/dashboard");

  } catch (error) {
    console.log(error);

    alert("Google Signup Failed");
  }
};

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        relative
        overflow-hidden
        bg-gradient-to-br
        from-indigo-950
        via-blue-900
        to-cyan-900
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
          top-0
          left-0
        "
      />

      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-purple-500/20
          blur-[120px]
          rounded-full
          bottom-0
          right-0
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          backdrop-blur-xl
          bg-white/10
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-8
        "
      >
        {/* Heading */}

        <div className="text-center mb-8">
          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Create Account
          </h1>

          <p
            className="
              text-gray-300
              mt-2
            "
          >
            Join Smart Rental Today
          </p>
        </div>

        {/* Social Signup */}

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="
              bg-white/10
              border
              border-white/20
              text-white
              py-3
              rounded-xl
              hover:bg-white/20
              transition
            "
            
          >
            <FaGoogle className="mx-auto" />
          </button>

          <button
            type="button"
            className="
              bg-white/10
              border
              border-white/20
              text-white
              py-3
              rounded-xl
              hover:bg-white/20
              transition
            "
          >
            <FaGithub className="mx-auto" />
          </button>

          <button
            type="button"
            className="
              bg-white/10
              border
              border-white/20
              text-white
              py-3
              rounded-xl
              hover:bg-white/20
              transition
            "
          >
            <FaFacebook className="mx-auto" />
          </button>
        </div>

        <div
          className="
            text-center
            text-gray-400
            mb-6
          "
        >
          OR
        </div>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
              mb-4
              outline-none
            "
          />

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
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
              mb-4
              outline-none
            "
          />

          {/* Password */}

          <div className="relative mb-3">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-300
                outline-none
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
                text-white
              "
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* Strength */}

          <div className="mb-4">
            <div
              className="
                h-2
                bg-gray-700
                rounded-full
                overflow-hidden
              "
            >
              <div
                className={`h-full transition-all ${
                  strengthColor[
                    strength
                  ]
                }`}
                style={{
                  width: `${
                    (strength /
                      4) *
                    100
                  }%`,
                }}
              />
            </div>

            <p
              className="
                text-xs
                text-gray-300
                mt-1
              "
            >
              Strength:{" "}
              {
                strengthText[
                  strength
                ]
              }
            </p>
          </div>

          {/* Confirm Password */}

          <div className="relative mb-6">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-300
                outline-none
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-white
              "
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <button
            disabled={loading}
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              hover:scale-[1.02]
              transition
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p
          className="
            text-center
            text-gray-300
            mt-6
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-cyan-400
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;