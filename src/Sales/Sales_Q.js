import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "../util/config";

function Sl_Q() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentQuarter = Math.ceil((today.getMonth() + 1) / 3);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedQuarter) {
      const quarterStartMonth = (selectedQuarter - 1) * 3 + 1;
      const quarterEndMonth = quarterStartMonth + 2;
      const startDay = "01";
      const endDay = quarterEndMonth === 12 ? "31" : "30";
      setStartDate(
        `${selectedYear}-${quarterStartMonth
          .toString()
          .padStart(2, "0")}-${startDay}`
      );
      setEndDate(
        `${selectedYear}-${quarterEndMonth
          .toString()
          .padStart(2, "0")}-${endDay}`
      );
    }
  }, [selectedYear, selectedQuarter]);

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
      ); 
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex-cols justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md sticky top-0">
        <h1 className="text-xl font-semibold mb-4">Select Year and Quarter</h1>
        <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none"
          >
            <option value="">Select Year</option>
            <optgroup
              label="Years"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={currentYear + i} value={currentYear + i}>
                  {currentYear + i}
                </option>
              ))}
            </optgroup>
          </select>
          <select
            value={selectedQuarter}
            onChange={handleQuarterChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none"
          >
            <option value="">Select Quarter</option>
            {quarters.map((quarter, index) => (
              <option key={index + 1} value={index + 1}>
                {quarter}
              </option>
            ))}
          </select>
        </div>
        {startDate && endDate && (
          <p>
            Start Date of Quarter {selectedQuarter} is "{startDate}" and End
            Date of Quarter {selectedQuarter} is "{endDate}"
          </p>
        )}
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md overflow-x-auto ">
        <h2 className="text-xl font-semibold p-4">Sales Data</h2>
        <div className="table-container overflow-y-auto" style={{ maxHeight: "400px" }}>
          <table className="w-full table-auto ">
            <thead className="sticky top-0 bg-white ">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {ExpanceData.map((expense) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2 text-center">{expense.id}</td>
                  <td className="border px-4 py-2 text-center">
                    {expense.date}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {expense.grandtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="p-4">Total Sales: {totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Sl_Q;
