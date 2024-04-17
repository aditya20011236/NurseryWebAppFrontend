

import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "./util/config";

function PandL() {
  const [selectedDate, setSelectedDate] = useState("");
  const [calculationType, setCalculationType] = useState("Days");
  const [result, setResult] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);

  const endDate = selectedDate;

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function handleCalculationTypeChange(event) {
    setCalculationType(event.target.value);
  }

  useEffect(() => {
    calculateResult();
  }, [selectedDate, calculationType]);

  useEffect(() => {
    if (startDate !== "") {
      fetchData();
    }
  }, [startDate]);

  const calculateResult = () => {
    // Your existing calculation logic remains unchanged
    // ...

    // Calculate profit or loss
    const profit = totalSales - totalExpenses;
    setProfitOrLoss(profit);
  };

  const fetchData = async () => {
    try {
      const salesResponse = await axios.get(
        host + "/api/invoices/getDataBetweenDates",
        {
          // const salesResponse = await axios.get('http://16.170.242.6:8080/api/invoices/getDataBetweenDates', {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setSalesData(salesResponse.data);
      const salesTotal = salesResponse.data.reduce(
        (acc, item) => acc + Number(item.grandtotal),
        0
      );
      setTotalSales(salesTotal);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }

    try {
      const expenseResponse = await axios.get(
        host + "/api/expenses/getDataBetweenDates",
        {
          // const expenseResponse = await axios.get('http://16.170.242.6:8080/api/expenses/getDataBetweenDates', {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setExpenseData(expenseResponse.data);
      const expenseTotal = expenseResponse.data.reduce(
        (acc, item) => acc + Number(item.grandTotal),
        0
      );
      setTotalExpenses(expenseTotal);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
        {/* Your existing date selection and calculation UI */}
        {/* ... */}
      </div>

      <div className="max-w-xl justify-center">
        <h1 className="text-2xl font-semibold mb-4">Sales and Expenses Data</h1>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">DATE</th>
              <th className="py-2 px-4">SALES</th>
              <th className="py-2 px-4">EXPENSES</th>
            </tr>
          </thead>
          <tbody>
            {/* Render rows for both sales and expenses */}
            {salesData.map((saleItem, index) => (
              <tr
                key={index}
                className="bg-gray-100 text-center divide-y divide-x divide-solid divide-gray-500"
              >
                <td className="py-2 px-4 divide-y divide-solid divide-gray-500">
                  {saleItem.id}
                </td>
                <td className="py-2 px-4">{saleItem.date}</td>
                <td className="py-2 px-4">{saleItem.grandtotal}</td>
                {/* Assuming expense data has the same structure as sales data */}
                <td className="py-2 px-4">
                  {expenseData[index]?.grandTotal || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Display total sales, total expenses, and profit or loss */}
        <h1 className="text-5xl font-bold">
          {" "}
          Total Sales = {totalSales}, Total Expenses = {totalExpenses},
          Profit/Loss = {profitOrLoss}{" "}
        </h1>
      </div>
    </div>
  );
}

export default PandL;
