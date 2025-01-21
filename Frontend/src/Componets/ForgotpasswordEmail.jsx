import React, { useState } from "react";
import axios from "axios";

const ForgotpasswordEmail = () => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(""); // To display success/error messages
  const [error, setError] = useState(""); // To handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("token"))?.access;
      if (!token) throw new Error("No access token found. Please log in.");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/send-reset-password-email/",
        { email }
      );
      setMessage(response.data.msg); // Backend returns a success message
    } catch (err) {
      setError(
        err.response?.data?.email || "Something went wrong. Please try again."
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
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-zinc-600 rounded-md hover:bg-zinc-500"
          >
            send
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

export default ForgotpasswordEmail;
