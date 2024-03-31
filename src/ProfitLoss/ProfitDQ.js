import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PL_Q() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedQuarter) {
      fetchData();
    }
  }, [selectedYear, selectedQuarter]);

  const fetchData = async () => {
    try {
      const quarterStartMonth = (parseInt(selectedQuarter) - 1) * 3 + 1;
      const quarterEndMonth = quarterStartMonth === 10 ? 12 : quarterStartMonth + 2;
      const startDay = quarterStartMonth === 10 ? '01' : '01';
      const endDay = quarterEndMonth === 12 ? '31' : '30';
      const startDate = `${selectedYear}-${quarterStartMonth.toString().padStart(2, '0')}-${startDay}`;
      const endDate = `${selectedYear}-${quarterEndMonth.toString().padStart(2, '0')}-${endDay}`;
      
      // const expensesResponse = await axios.get('http://localhost:8080/api/expenses/expenses/getDataBetweenDates/date', {
        const expensesResponse = await axios.get('http://16.170.242.6:8080/api/expenses/expenses/getDataBetweenDates/date', {
        params: {
          startDate,
          endDate
        }
      });
     
      // const salesResponse = await axios.get('http://localhost:8080/api/invoices/getDataBetweenDates/date', {
        const salesResponse = await axios.get('http:// 16.170.242.6:8080/api/invoices/getDataBetweenDates/date', {
        params: {
          startDate,
          endDate
        }
      });

      setExpenseData(expensesResponse.data);
      const totalExp = expensesResponse.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
      setTotalExpenses(totalExp);

      const totalSalesQuarter = salesResponse.data.reduce((acc, item) => acc + Number(item.grandtotal), 0);
      setTotalSales(totalSalesQuarter);

      const profitLossQuarter = totalSalesQuarter - totalExp;
      setProfitLoss(profitLossQuarter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Year and Quarter</h1>
        <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <select value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none">
            <option value="">Select Year</option>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={2022 + i} value={2022 + i}>{2022 + i}</option>
            ))}
          </select>
          <select value={selectedQuarter} onChange={handleQuarterChange} className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none">
            <option value="">Select Quarter</option>
            {quarters.map((quarter, index) => (
              <option key={index + 1} value={index + 1}>{quarter}</option>
            ))}
          </select>
        </div>
        {expenseData.length > 0 && <p className="text-sm">Start Date of Quarter {selectedQuarter} is "{expenseData[0].date}" and End Date of Quarter {selectedQuarter} is "{expenseData[expenseData.length - 1].date}"</p>}
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-xl font-semibold p-4">P&L Details</h2>
        <div className="table-container">
          <table className="w-full table-auto text-center">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-4 py-2">Total Sales</th>
                <th className="px-4 py-2">Total Expenses</th>
                <th className="px-4 py-2">Profit/Loss</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              <tr>
                <td className="px-4 py-2">{totalSales}</td>
                <td className="px-4 py-2">{totalExpenses}</td>
                <td className="px-4 py-2">{profitLoss}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PL_Q;
