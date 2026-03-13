import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/user/login",
        { email, password },
        {
          
          
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("token", data.token);

      // Update auth state in parent (App.jsx)
      setAuth(true);

      // Navigate to Todo UI immediately
      navigateTo("/");

      // Show toast after navigation
      toast.success(data.message || "User logged in successfully");

      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response?.data);

      const err = error.response?.data?.errors;

      if (Array.isArray(err)) {
        toast.error(err.join(", "));
      } else {
        toast.error(err || "Login failed");
      }
    }
  };
return (
  <div className="flex h-screen items-center justify-center  bg-[rgb(246,242,239)]  px-4">
    <div className="w-full max-w-md p-8 bg-[#1C2340] text-white rounded-xl shadow-2xl">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-md text-[#ebedf6] border-[#ebedf6]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 rounded-md text-[#ebedf6] border-[#ebedf6]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#50223C] hover:bg-[#3e1a2f] rounded-md font-semibold p-3 transition duration-300"
        >
          Login
        </button>

        <p className="mt-5 text-center text-gray-300">
          New user?{" "}
          <Link
            to="/signup"
            className="text-[#F0DAC5] font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Login;
