import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "../util/config";

function PL_Daily() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate()); // Set default date to today
  const [ExpenseData, setExpenseData] = useState([]);
  const [SalesData, setSalesData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (selectedDate !== "") {
      fetchData();
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchData = async () => {
    try {
      const startDate = selectedDate;
      const endDate = selectedDate;

      const response = await axios.get(
        host + "/api/expenses/expenses/getDataBetweenDates/date",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setExpenseData(response.data);
      const total = response.data.reduce(
        (acc, item) => acc + Number(item.grandTotal),
        0
      );
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching expenses data:", error);
    }

    try {
      const startDate = selectedDate;
      const endDate = selectedDate;

      const response = await axios.get(
        host + "/api/invoices/getDataBetweenDates/date",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setSalesData(response.data);
      const totalSales = response.data.reduce(
        (acc, item) => acc + Number(item.grandtotal),
        0
      );
      setTotalSales(totalSales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Function to get today's date in the format YYYY-MM-DD
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Date</h1>
        <div className="flex items-center mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60"
          />
        </div>
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Profit&Loss</h2>
        <table className="table-fixed w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Total Sales</th>
              <th className="px-4 py-2">Total Expenses</th>
              <th className="px-4 py-2">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{totalSales.toFixed(2)}</td>
              <td className="border px-4 py-2">{totalExpenses.toFixed(2)}</td>
              <td className="border px-4 py-2">{totalSales - totalExpenses}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PL_Daily;
