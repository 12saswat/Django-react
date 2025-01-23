import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))?.access;
        const res = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data); // Set user data
      } catch (err) {
        setError("Unable to fetch user profile. Please log in again.");
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect after logout
  };

  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : data ? (
        <div className="flex justify-around items-center pt-10">
          <div>
            <h1>
              Welcome,{" "}
              <span className="text-xl text-slate-700">{data.name}</span>
            </h1>
            <p>
              email: <span className="text-xl text-blue-800">{data.email}</span>
            </p>
          </div>
          <button
            onClick={handelLogout}
            className="bg-blue-600 text-[#ffffff] font-semibold hover:font-bold rounded-md px-4 py-1 hover:bg-transparent transition duration-500 hover:text-green-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
