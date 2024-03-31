import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ex_Yearly() {
  const [selectedYear, setSelectedYear] = useState('');
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

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
     
      // const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
        const response = await axios.get('http:// 16.170.242.6:8080/api/expenses/getDataBetweenDates', {
        params: {
          startDate: startOfYear,
          endDate: endOfYear
        }
      });

      setExpanceData(response.data);
      const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col  h-screen'>
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Year</h1>
        <div className="flex items-center mb-4">
          <input type="number" value={selectedYear} onChange={handleYearChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" placeholder="Enter year" />
        </div>
      </div>

      <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
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
            {ExpanceData.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.id}</td>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-4">Total Expenses: {totalExpenses}</p>
      </div>
    </div>
  );
}

export default Ex_Yearly;
