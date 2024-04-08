import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loginbg from "./Loginbg.jpg";
import host from "../util/config";

function AdminRegForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    mobno: "",
    gender: "",
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(host + "/save", user)
      // axios.post('http://16.170.242.6:8080/save', user)
      .then((response) => {
        console.log("User saved successfully:", response.data);
        setSuccessMessage("User registered successfully");
        setUser({
          fullname: "",
          mobno: "",
          gender: "",
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  const handleNavigate = () => {
    navigate("/admin-login");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register User</h2>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => setSuccessMessage("")}
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 5.652a.5.5 0 0 1 0 .707l-8.485 8.485a.5.5 0 0 1-.707-.707l8.485-8.485a.5.5 0 0 1 .707 0z" />
              </svg>
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={user.fullname}
            onChange={handleChange}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="text"
            name="mobno"
            placeholder="Mobile Number"
            value={user.mobno}
            onChange={handleChange}
            required
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              type="submit"
            >
              Register
            </button>
            <button
              onClick={handleNavigate}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              type="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegForm;
