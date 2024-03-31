// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Ex_Daily() {
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [ExpanceData, setExpanceData] = useState([]);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [daysInMonth, setDaysInMonth] = useState(0);
//   console.log(startDate);
//   console.log(endDate);

//   const months = [
//     { name: 'January', days: 31, numerical: '01' },
//     { name: 'February', days: 28, numerical: '02' },
//     { name: 'March', days: 31, numerical: '03' },
//     { name: 'April', days: 30, numerical: '04' },
//     { name: 'May', days: 31, numerical: '05' },
//     { name: 'June', days: 30, numerical: '06' },
//     { name: 'July', days: 31, numerical: '07' },
//     { name: 'August', days: 31, numerical: '08' },
//     { name: 'September', days: 30, numerical: '09' },
//     { name: 'October', days: 31, numerical: '10' },
//     { name: 'November', days: 30, numerical: '11' },
//     { name: 'December', days: 31, numerical: '12' }
//   ];

//   const years = Array.from({ length: 101 }, (_, i) => 2000 + i); // Generate an array of years from 2000 to 2100

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handleMonthChange = (event) => {
//     const month = event.target.value;
//     const selectedMonthObj = months.find(monthObj => monthObj.name === month);
//     setSelectedMonth(month);
//     setDaysInMonth(selectedMonthObj.days);
//   };

//   const handleDayChange = (event) => {
//     setSelectedDay(event.target.value);
//   };

//   useEffect(() => {
//     if (selectedYear && selectedMonth && selectedDay) {
//       setStartDate(`${selectedYear}-${months.find(monthObj => monthObj.name === selectedMonth).numerical}-${selectedDay}`);
//       setEndDate(`${selectedYear}-${months.find(monthObj => monthObj.name === selectedMonth).numerical}-${selectedDay}`);
//     }
//   }, [selectedYear, selectedMonth, selectedDay]);

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchData();
//     }
//   }, [startDate, endDate]);

//   const fetchData = async () => {
//     try {
//       console.log('Fetching data between dates:', startDate, endDate);
//       const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
//         params: {
//           startDate,
//           endDate
//         }
//       });
//       console.log('Fetched data:', response.data);
//       setExpanceData(response.data);
//       const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0); // Assuming total expense is returned from backend
//       console.log('Total expenses:', total);
//       setTotalExpenses(total);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className="flex-col justify-center items-center min-h-screen bg-gray-100">
//       <div className="max-w-md p-4 bg-white shadow-md rounded-md justify-center items-center">
//         <h1 className="text-xl font-semibold mb-4">Select Year, Month, and Day</h1>
//         <div className="flex flex-col sm:flex-row mb-4">
//           <div className="mr-2">
//             <label htmlFor="yearSelect" className="mb-2">Select Year:</label>
//             <select id="yearSelect" value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
//               <option value="">Select Year</option>
//               {years.map((year, index) => (
//                 <option key={index} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mr-2">
//             <label htmlFor="monthSelect" className="mb-2">Select Month:</label>
//             <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
//               <option value="">Select Month</option>
//               {months.map((month, index) => (
//                 <option key={index} value={month.name}>{month.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="daySelect" className="mb-2">Select Day:</label>
//             <select id="daySelect" value={selectedDay} onChange={handleDayChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
//               <option value="">Select Day</option>
//               {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day, index) => (
//                 <option key={index} value={day}>{day}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       {startDate && endDate && (
//         <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
//           <h2 className="text-xl font-semibold p-4">Expense Data</h2>
//           <table className="w-full table-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">ID</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Expense</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ExpanceData.map((expense) => (
//                 <tr key={expense.id}>
//                   <td className="border px-4 py-2">{expense.id}</td>
//                   <td className="border px-4 py-2">{expense.date}</td>
//                   <td className="border px-4 py-2">{expense.grandTotal}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <p className="p-4">Total Expenses: {totalExpenses}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Ex_Daily;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ex_Daily() {
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

      // const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
      const response = await axios.get('http://16.170.242.6:8080/api/expenses/getDataBetweenDates', {
        params: {
          startDate,
          endDate
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
        <h1 className="text-xl font-semibold mb-4">Expense Report</h1>
        <div className="flex items-center mb-4">
          <input type="date" value={selectedDate} onChange={handleDateChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" />
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

export default Ex_Daily;

