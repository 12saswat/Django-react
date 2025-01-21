import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        formData
      );
      localStorage.setItem("token", JSON.stringify(response.data.token)); // Save token as JSON
      navigate("/profile");
      setMessage(response.data.msg);
      console.log("Token:", response.data.token); // Save this token for authentication
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.errors;
        if (errors.non_field_errors) {
          setMessage(errors.non_field_errors[0]);
        } else {
          setMessage(response.data.msg);
        }
      } else {
        setMessage("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col p-10 justify-center items-center bg-zinc-700 h-[100vh]">
      <h2 className="text-5xl pb-10 font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-1 text-white">
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
          <button
            type="submit"
            className="px-4 py-2 mx-auto bg-zinc-600 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
      <p>
        Forgot password{" "}
        <Link to={"/forgotPassword"} className="text-blue-500">
          Forgot password
        </Link>
      </p>
      {message && (
        <p className="text-red-400 font-mono text-base ">{message}</p>
      )}
    </div>
  );
};

export default Login;
