import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "../util/config";

function Ex_Yearly() {
  const currentYear = new Date().getFullYear(); // Get the current year

  const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Set default year to current year
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    const currentYear = new Date().getFullYear();


    if (parseInt(selectedYear) <= currentYear) {
      setSelectedYear(selectedYear);
    } else {

      alert("Future Year is not allowed");

    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedCategory]);

  const fetchData = async () => {
    if (selectedYear !== "") {
      try {
        const startOfYear = `${selectedYear}-01-01`;
        const endOfYear = `${selectedYear}-12-31`;

        let url = host + "/api/expenses/getDataBetweenDates";
        const params = { startDate: startOfYear, endDate: endOfYear };

        // If a category is selected, add it to the parameters
        if (selectedCategory !== "" && selectedCategory !== "Whole Year") {
          params.expenseType = selectedCategory;

          const response = await axios.get(url, { params });

          setExpenseData(response.data);
          const total = response.data.reduce(
            (acc, item) => acc + Number(item.grandTotal),
            0
          );
          setTotalExpenses(total);
        } else if (selectedCategory === "Whole Year") {
          const categories = ["employee", "Routine", "capital", "Raw_material"];
          let allData = [];
          let total = 0;

          for (const category of categories) {
            params.expenseType = category;
            const response = await axios.get(url, { params });
            allData = [...allData, ...response.data];
            total += response.data.reduce(
              (acc, item) => acc + Number(item.grandTotal),
              0
            );
          }

          setExpenseData(allData);
          setTotalExpenses(total);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Year</h1>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={selectedYear}
            onChange={handleYearChange}
            className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60"
            placeholder="Enter year"
          />
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="employee">Employee</option>
              <option value="Routine">Routine</option>
              <option value="capital">Capital</option>
              <option value="Raw_material">Raw Material</option>
              <option value="Whole Year">All</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Expense Data</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Expense</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2 text-center">{expense.id}</td>
                <td className="border px-4 py-2 text-center">{expense.date}</td>
                <td className="border px-4 py-2 text-center">
                  {expense.grandTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-4">Total Expenses: {totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Ex_Yearly;
