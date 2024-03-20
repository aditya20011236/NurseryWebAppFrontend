import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PL_week() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  const months = [
    { name: 'January', days: 31, numerical: '01' },
    { name: 'February', days: 28, numerical: '02' },
    { name: 'March', days: 31, numerical: '03' },
    { name: 'April', days: 30, numerical: '04' },
    { name: 'May', days: 31, numerical: '05' },
    { name: 'June', days: 30, numerical: '06' },
    { name: 'July', days: 31, numerical: '07' },
    { name: 'August', days: 31, numerical: '08' },
    { name: 'September', days: 30, numerical: '09' },
    { name: 'October', days: 31, numerical: '10' },
    { name: 'November', days: 30, numerical: '11' },
    { name: 'December', days: 31, numerical: '12' }
  ];

  const getWeeksInMonth = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const numDays = lastDay.getDate();
    const weeks = [];
    let currentWeek = [];

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month - 1, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
      if (i === numDays && currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
    }
    return weeks.map((week, index) => ({
      name: `Week ${index + 1}`,
      startDate: week[0],
      endDate: week[week.length - 1]
    }));
  };

  const years = Array.from({ length: 6 }, (_, i) => 2022 + i); // Generate an array of years from 2000 to 2100

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const selectedMonthObj = months.find(month => month.name === selectedMonth);
      const startDate = `${selectedYear}-${selectedMonthObj.numerical}-01`;
      const endDate = `${selectedYear}-${selectedMonthObj.numerical}-${selectedMonthObj.days.toString().padStart(2, '0')}`;
      fetchData(startDate, endDate);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedWeek) {
      const selectedMonthObj = months.find(month => month.name === selectedMonth);
      const weeksInMonth = getWeeksInMonth(selectedYear, selectedMonthObj.numerical);
      const selectedWeekIndex = parseInt(selectedWeek.substring(5)) - 1;
      const startDate = weeksInMonth[selectedWeekIndex].startDate.toISOString().split('T')[0];
      const endDate = weeksInMonth[selectedWeekIndex].endDate.toISOString().split('T')[0];
      fetchData(startDate, endDate);
    }
  }, [selectedWeek]);

  const fetchData = async (startDate, endDate) => {
    try {
      const expenseResponse = await axios.get('http://localhost:8080/api/expenses/expenses/getDataBetweenDates/date', {
        params: {
          startDate,
          endDate
        }
      });

      const totalExp = expenseResponse.data.reduce((acc, item) => acc + Number(item.grandTotal), 0); 
      setTotalExpenses(totalExp);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
    
    try {
      const salesResponse = await axios.get('http://localhost:8080/api/invoices/getDataBetweenDates/date', {
        params: {
          startDate,
          endDate
        }
      });

      const totalSales = salesResponse.data.reduce((acc, item) => acc + Number(item.grandtotal), 0);
      setTotalSales(totalSales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    const profitLossValue = totalSales - totalExpenses;
    setProfitLoss(profitLossValue);
  }, [totalSales, totalExpenses]);

  return (
    <div className="flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md justify-center items-center">
        <h1 className="text-xl font-semibold mb-4">Select Year, Month, and Week</h1>
        <div className="flex flex-col sm:flex-row mb-4">
          <div className="mr-2">
            <label htmlFor="yearSelect" className="mb-2">Select Year:</label>
            <select id="yearSelect" value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="mr-2">
            <label htmlFor="monthSelect" className="mb-2">Select Month:</label>
            <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month.name}>{month.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="weekSelect" className="mb-2">Select Week:</label>
            <select id="weekSelect" value={selectedWeek} onChange={handleWeekChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Week</option>
              {selectedMonth && months.find(month => month.name === selectedMonth) &&
                getWeeksInMonth(selectedYear, months.find(month => month.name === selectedMonth).numerical).map((week, index) => (
                  <option key={index} value={`Week ${index + 1}`}>{week.name}</option>
                ))}
            </select>
          </div>
        </div>
        {selectedWeek && (
          <p>{`Selected Week: ${selectedWeek}`}</p>
        )}
      </div>
      <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Profit/Loss</h2>
        <div className="p-4">
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
                <td className="border px-4 py-2">{totalSales}</td>
                <td className="border px-4 py-2">{totalExpenses}</td>
                <td className="border px-4 py-2">{profitLoss}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PL_week;
