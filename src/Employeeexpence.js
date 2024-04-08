import React, { useState } from "react";
import axios from "axios";
import Menu from "./Sidebar";
import host from "./util/config";
function Employeeexpence() {
  const [formData, setFormData] = useState({
    employeeName: "",
    date: "",
    salary: "",
    total: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(host + "/api/ex", formData);
      alert("Expense submitted successfully!");
    } catch (error) {
      console.error("Error submitting expense:", error);
      alert("Failed to submit expense. Please try again later.");
    }
  };

  return (
    <div className="h-screen w-full flex justify-start items-center">
      <div className="ml-0 h-screen">
        <Menu />
      </div>
      <div className="container mx-auto mt-5 bg-gradient-to-r from-blue-200 to-blue-300 p-5 rounded-lg shadow-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl mb-8 text-center font-bold text-blue-800">
            Employee Expense Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="employeeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Employeeexpence;
