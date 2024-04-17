
import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "../util/config";

function Sl_Month() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('default', { month: 'long' });

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const months = [
    { name: "January", days: 31, numerical: "01" },
    { name: "February", days: 28, numerical: "02" },
    { name: "March", days: 31, numerical: "03" },
    { name: "April", days: 30, numerical: "04" },
    { name: "May", days: 31, numerical: "05" },
    { name: "June", days: 30, numerical: "06" },
    { name: "July", days: 31, numerical: "07" },
    { name: "August", days: 31, numerical: "08" },
    { name: "September", days: 30, numerical: "09" },
    { name: "October", days: 31, numerical: "10" },
    { name: "November", days: 30, numerical: "11" },
    { name: "December", days: 31, numerical: "12" },
  ];
  const years = Array.from({ length: 6 }, (_, i) => 2022 + i); // Generate an array of years from 2022 to 2027

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const selectedMonthObj = months.find(
        (month) => month.name === selectedMonth
      );
      let daysInMonth = selectedMonthObj.days;

      // Adjust days in February for leap years
      if (selectedMonth === "February") {
        if (
          (selectedYear % 4 === 0 && selectedYear % 100 !== 0) ||
          selectedYear % 400 === 0
        ) {
          daysInMonth = 29;
        }
      }

      setStartDate(`${selectedYear}-${selectedMonthObj.numerical}-01`);
      setEndDate(
        `${selectedYear}-${selectedMonthObj.numerical}-${daysInMonth
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        host + "/api/invoices/getDataBetweenDates",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setExpanceData(response.data);
      const total = response.data.reduce(
        (acc, item) => acc + Number(item.grandtotal),
        0
      ); // Assuming total expense is returned from backend
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md justify-center items-center">
        <h1 className="text-xl font-semibold mb-4">Select Year and Month</h1>
        <div className="flex flex-col sm:flex-row mb-4">
          <div className="mr-2">
            <label htmlFor="yearSelect" className="mb-2">
              Select Year:
            </label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={handleYearChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            >
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="monthSelect" className="mb-2">
              Select Month:
            </label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month.name}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Sales Data</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">SALES</th>
            </tr>
          </thead>
          <tbody>
            {ExpanceData.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2 text-center">{expense.id}</td>
                <td className="border px-4 py-2 text-center">{expense.date}</td>
                <td className="border px-4 py-2 text-center">
                  {expense.grandtotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-4">Total Sales: {totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Sl_Month;
