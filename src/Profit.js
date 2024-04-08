import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "./util/config";

function ProfitTable() {
  const [selectedDate, setSelectedDate] = useState("");
  const [calculationType, setCalculationType] = useState("Days");
  const [result, setResult] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const endDate = selectedDate;
  console.log(totalSales);
  console.log(totalExpenses);
  const PandL = totalSales - totalExpenses;
  console.log(PandL);
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
    const date = new Date(selectedDate);
    const currentYear = date.getFullYear();
    let quarter = Math.floor((date.getMonth() + 3) / 3);
    if (quarter === 0) quarter = 4;
    const fiscalYear = date.getMonth() >= 3 ? currentYear + 1 : currentYear;

    switch (calculationType) {
      case "Days":
        setStartDate(formatDate(selectedDate));
        setResult(
          `Your date is ${formatDate(selectedDate)}, it is the ${getDayOfYear(
            selectedDate
          )}th day of financial year ${currentYear}.`
        );
        break;
      case "Weeks":
        setStartDate(getFirstDayOfWeek(selectedDate));
        setResult(
          `Your date is ${formatDate(selectedDate)}, it is the ${getWeekOfYear(
            selectedDate
          )}th week of financial year ${currentYear} and the first day of the week is ${getFirstDayOfWeek(
            selectedDate
          )}.`
        );
        break;
      case "Months":
        setStartDate(getFirstDayOfMonth(selectedDate));
        setResult(
          `Your date is ${formatDate(selectedDate)}, it is the ${getMonthOfYear(
            selectedDate
          )}th month of financial year ${currentYear} and the first day of the month is ${getFirstDayOfMonth(
            selectedDate
          )}.`
        );
        break;
      case "Quarters":
        setStartDate(getFirstDayOfQuarter(selectedDate));
        setResult(
          `Your date is ${formatDate(
            selectedDate
          )}, it is the ${getQuarterOfYear(
            selectedDate
          )}th quarter of financial year ${currentYear} and the first day of the quarter is ${getFirstDayOfQuarter(
            selectedDate
          )}.`
        );
        break;
      case "Years":
        setStartDate(getFirstDayOfYear(selectedDate));
        setResult(
          `Your date is ${formatDate(
            selectedDate
          )}, it is financial year ${currentYear} and the first day of the year is ${getFirstDayOfYear(
            selectedDate
          )}.`
        );
        break;
      default:
        setResult("");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        host + "/api/invoices/getDataBetweenDates",
        {
          // const response = await axios.get('http://16.170.242.6:8080/api/invoices/getDataBetweenDates', {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setSalesData(response.data);
      const total = response.data.reduce(
        (acc, item) => acc + Number(item.grandtotal),
        0
      ); // Assuming total expense is returned from backend
      setTotalSales(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await axios.get(
        host + "/api/expenses/getDataBetweenDates",
        {
          // const response = await axios.get('http://16.170.242.6:8080/api/expenses/getDataBetweenDates', {
          params: {
            startDate,
            endDate,
          },
        }
      );

      setExpanceData(response.data);
      const total = response.data.reduce(
        (acc, item) => acc + Number(item.grandTotal),
        0
      ); // Assuming total expense is returned from backend
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function getDayOfYear(dateString) {
    const date = new Date(dateString);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function getWeekOfYear(dateString) {
    const date = new Date(dateString);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek);
  }

  function getMonthOfYear(dateString) {
    const date = new Date(dateString);
    return date.getMonth() + 1;
  }

  function getQuarterOfYear(dateString) {
    const date = new Date(dateString);
    return Math.floor((date.getMonth() + 3) / 3);
  }

  function getFirstDayOfWeek(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
    return formatDate(firstDayOfWeek);
  }

  function getFirstDayOfMonth(dateString) {
    const date = new Date(dateString);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return formatDate(firstDayOfMonth);
  }

  function getFirstDayOfQuarter(dateString) {
    const date = new Date(dateString);
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    const firstDayOfQuarter = new Date(
      date.getFullYear(),
      (quarter - 1) * 3,
      1
    );
    return formatDate(firstDayOfQuarter);
  }

  function getFirstDayOfYear(dateString) {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    return formatDate(firstDayOfYear);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4">Expense Report</h1>
        <div className="flex items-center mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60"
          />
          <button
            onClick={calculateResult}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
          >
            Calculate
          </button>
        </div>
        <select
          value={calculationType}
          onChange={handleCalculationTypeChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
        >
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
          <option value="Months">Months</option>
          <option value="Quarters">Quarters</option>
          <option value="Years">Years</option>
        </select>
        {result && <p className="mt-4">{result}</p>}
      </div>

      <div className="max-w-xl justify-center">
        <h1 className="text-2xl font-semibold mb-4">Expense Data</h1>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">DATE</th>
              <th className="py-2 px-4">SALES</th>
            </tr>
          </thead>
          <tbody>
            {salesData.length > 0 ? (
              salesData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 text-center divide-y divide-x divide-solid divide-gray-500"
                >
                  <td className="py-2 px-4 divide-y divide-solid divide-gray-500">
                    {item.id}
                  </td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4">{item.grandtotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        <h1 className="text-5xl font-bold">
          {" "}
          Total Sales = {totalSales} and Total Expance ={totalExpenses}{" "}
        </h1>
      </div>
    </div>
  );
}

export default ProfitTable;
