import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // Separate error state for detailed error handling

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"))?.access;
      if (!token) throw new Error("No access token found. Please log in.");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/changepassword/",
        { password: formData.password, password2: formData.password2 },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      setMessage("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col p-10 justify-center items-center bg-zinc-700 h-[100vh]">
      <h2 className="text-5xl pb-10 font-bold text-white">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4 text-white">
          <label>
            <input
              className="bg-zinc-800 rounded-md p-3 w-[400px]"
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              className="bg-zinc-800 p-3 w-[400px] rounded-md"
              type="password"
              name="password2"
              placeholder="Confirm New Password"
              value={formData.password2}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-600 rounded-md hover:bg-zinc-500"
          >
            Change Password
          </button>
        </div>
      </form>
      {error && <p className="text-red-400 font-mono text-base">{error}</p>}
      {message && (
        <p className="text-green-400 font-mono text-base">{message}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
