import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loginbg from "./Loginbg.jpg";
import host from "../util/config";

const EmpLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(host + "/api/employees/login", {
        // const response = await fetch('http:// 16.170.242.6:8080/api/employees/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        window.location.href = "/empinvoice";
      } else {
        setError("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-transparent text-white">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Login As Employee
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/emp_register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>
          {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
