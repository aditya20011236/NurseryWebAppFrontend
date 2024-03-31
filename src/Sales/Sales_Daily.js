import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sl_Daily() {
  const [selectedDate, setSelectedDate] = useState('');
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (selectedDate !== '') {
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
      
      // const response = await axios.get('http://localhost:8080/api/invoices/getDataBetweenDates', {
        const response = await axios.get('http://16.170.242.6:8080/api/invoices/getDataBetweenDates', {
        params: {
          startDate,
          endDate
        }
      });

      setExpanceData(response.data);
      const total = response.data.reduce((acc, item) => acc + Number(item.grandtotal), 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col  h-screen'>
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Sales Report</h1>
        <div className="flex items-center mb-4">
          <input type="date" value={selectedDate} onChange={handleDateChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" />
        </div>
      </div>

      <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
        <h2 className="text-xl font-semibold p-4">Sales Data</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Sales</th>
            </tr>
          </thead>
          <tbody>
            {ExpanceData.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.id}</td>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.grandtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-4">Total Sales: {totalExpenses}</p>
      </div>
    </div>
  );
}

export default Sl_Daily;

