import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false, // Add `tc` field
  });

  const [message, setMessage] = useState(""); // For feedback message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.password !== formData.password2) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        formData
      );
      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage("User email is already exist");
    }
  };

  return (
    <div className="flex flex-col p-10 justify-center items-center bg-zinc-700 h-[100vh]">
      <h2 className="text-5xl pb-10 font-bold">Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-1 text-white">
          <label>
            <input
              className="bg-zinc-800 p-3 w-[400px] rounded-md"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className="bg-zinc-800 rounded-md p-3 w-[400px]"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className="bg-zinc-800 p-3 w-[400px] rounded-md"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className="bg-zinc-800 p-3 w-[400px] rounded-md"
              type="password"
              name="password2"
              placeholder="Re-enter Password"
              value={formData.password2}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="flex items-center justify-start gap-3">
            <input
              className="bg-zinc-800 rounded-md"
              type="checkbox"
              name="tc"
              onChange={handleChange}
              checked={formData.tc}
            />
            Accept Terms and Conditions
          </label>
          <br />
          <button
            type="submit"
            className="px-4 py-2 mx-auto bg-zinc-600 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
      <p>
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-500">
          Login
        </Link>
      </p>
      {message && (
        <p className="text-red-400 font-mono text-base ">{message}</p>
      )}
    </div>
  );
};

export default Register;
