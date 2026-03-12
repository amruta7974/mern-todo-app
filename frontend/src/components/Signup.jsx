import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(
        "/user/signup",
        {
          username,
          email,
          password,
        },
        {
          
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(data);
      toast.success(data.message || "User registered successfully");
   
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response?.data);

      const err = error.response?.data?.errors;

      if (Array.isArray(err)) {
        toast.error(err.join(", "));
      } else {
        toast.error(err || "User registration failed");
      }
    }
  };

return (
  <div className="flex h-screen items-center justify-center bg-[#F0DAC5] px-4">
    <div className="w-full max-w-md p-8 bg-[#1C2340] text-white rounded-xl shadow-2xl">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Account
      </h2>

      <form onSubmit={handleRegister}>
        {/* username */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            className="w-full p-3 rounded-md text-[#ebedf6] focus:outline-none"
          />
        </div>

        {/* email */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-3 rounded-md text-[#ebedf6] focus:outline-none"
          />
        </div>

        {/* password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 rounded-md text-[#ebedf6] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#50223C] hover:bg-[#3e1a2f] rounded-md font-semibold p-3 transition duration-300"
        >
          Signup
        </button>

        <p className="mt-5 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#F0DAC5] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Signup;
