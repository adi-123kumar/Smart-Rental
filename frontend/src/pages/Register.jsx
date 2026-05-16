import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;