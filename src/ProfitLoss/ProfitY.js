import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PL_Yearly() {
  const [selectedYear, setSelectedYear] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSalesYearly, setTotalSalesYearly] = useState(0);
  const [profitLossYearly, setProfitLossYearly] = useState(0);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (selectedYear !== '') {
      fetchData();
    }
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const startOfYear = `${selectedYear}-01-01`;
      const endOfYear = `${selectedYear}-12-31`;
     
      // Fetch expenses data for the selected year
      // const expensesResponse = await axios.get('http://localhost:8080/api/expenses/expenses/getDataBetweenDates/date', {
        const expensesResponse = await axios.get('http:// 16.170.242.6:8080/api/expenses/expenses/getDataBetweenDates/date', {
        params: {
          startDate: startOfYear,
          endDate: endOfYear
        }
      });

      // Set expenses data and calculate total expenses
      setExpenseData(expensesResponse.data);
      const totalExp = expensesResponse.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
      setTotalExpenses(totalExp);

      // Fetch sales data for the entire year
      // const salesResponse = await axios.get('http://localhost:8080/api/invoices/getDataBetweenDates/date', {
        const salesResponse = await axios.get('http://16.170.242.6:8080/api/invoices/getDataBetweenDates/date', {
        params: {
          startDate: startOfYear,
          endDate: endOfYear
        }
      });

      // Calculate total sales
      const totalSales = salesResponse.data.reduce((acc, item) => acc + Number(item.grandtotal), 0);
      setTotalSalesYearly(totalSales);

      // Calculate profit/loss for the year
      const profitLoss = totalSales - totalExp;
      setProfitLossYearly(profitLoss);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Year</h1>
        <div className="flex items-center mb-4">
          <input type="number" value={selectedYear} onChange={handleYearChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" placeholder="Enter year" />
        </div>
      </div>

      <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
        <h2 className="text-xl font-semibold p-4">Profit&Loss </h2>
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
                <td className="border px-4 py-2">{totalSalesYearly}</td>
                <td className="border px-4 py-2">{totalExpenses}</td>
                <td className="border px-4 py-2">{profitLossYearly}</td>
              </tr>
            </tbody>
          </table>

      </div>
    </div>
  );
}

export default PL_Yearly;
