import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))?.access;
        if (!token) throw new Error("No access token found. Please log in.");

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

  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : data ? (
        <div>
          <h1>
            Welcome, <span className="text-xl text-slate-700">{data.name}</span>
          </h1>
          <p>
            email: <span className="text-xl text-blue-800">{data.email}</span>
          </p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
