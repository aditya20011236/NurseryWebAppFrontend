import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ex_Q() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedQuarter) {
      const quarterStartMonth = (parseInt(selectedQuarter) - 1) * 3 + 1;
      const quarterEndMonth = quarterStartMonth === 10 ? 12 : quarterStartMonth + 2;
      const startDay = quarterStartMonth === 10 ? '01' : '01';
      const endDay = quarterEndMonth === 12 ? '31' : '30';
      setStartDate(`${selectedYear}-${quarterStartMonth.toString().padStart(2, '0')}-${startDay}`);
      setEndDate(`${selectedYear}-${quarterEndMonth.toString().padStart(2, '0')}-${endDay}`);
    }
  }, [selectedYear, selectedQuarter]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
      const response = await axios.get('http:// 16.170.242.6:8080/api/expenses/getDataBetweenDates', {
        params: {
          startDate,
          endDate
        }
      });

      setExpanceData(response.data);
      const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0); // Assuming total expense is returned from backend
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex-cols justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4">Select Year and Quarter</h1>
        <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <select value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none">
            <option value="">Select Year</option>
            <optgroup label="Years" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={2022 + i} value={2022 + i}>{2022 + i}</option>
              ))}
            </optgroup>
          </select>
          <select value={selectedQuarter} onChange={handleQuarterChange} className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none">
            <option value="">Select Quarter</option>
            {quarters.map((quarter, index) => (
              <option key={index + 1} value={index + 1}>{quarter}</option>
            ))}
          </select>
        </div>
        {startDate && endDate && <p>Start Date of Quarter {selectedQuarter} is "{startDate}" and End Date of Quarter {selectedQuarter} is "{endDate}"</p>}
      </div>

      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md overflow-x-auto ">
        <h2 className="text-xl font-semibold p-4">Expense Data</h2>
        <div className="table-container ">
          <table className="w-full table-auto ">
            <thead className="sticky top-0 bg-white ">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Expense</th>
              </tr>
            </thead>
            <tbody className="vh-[20%] overflow-y-auto">
              {ExpanceData.map((expense) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">{expense.id}</td>
                  <td className="border px-4 py-2">{expense.date}</td>
                  <td className="border px-4 py-2">{expense.grandTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="p-4">Total Expenses: {totalExpenses}</p>
      </div>
    </div>
  );
}

export default Ex_Q;
