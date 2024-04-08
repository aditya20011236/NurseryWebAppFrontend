
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Ex_Daily() {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedExpenseType, setSelectedExpenseType] = useState('');
//     const [expenseData, setExpenseData] = useState([]);
//     const [totalExpenses, setTotalExpenses] = useState(0);

//     useEffect(() => {
//         if (selectedDate !== '') {
//             fetchData();
//         }
//     }, [selectedDate, selectedExpenseType]);

//     const handleDateChange = (event) => {
//         setSelectedDate(event.target.value);
//     };

//     const handleExpenseTypeChange = (event) => {
//         setSelectedExpenseType(event.target.value);
//     };

//     const fetchData = async () => {
//         try {
//             const startDate = selectedDate;
//             const endDate = selectedDate;

//             const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
//                 params: {
//                     startDate,
//                     endDate,
//                     expenseType: selectedExpenseType
//                 }
//             });

//             setExpenseData(response.data);
//             const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
//             setTotalExpenses(total);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     return (
//         <div className='flex flex-col h-screen'>
//             <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
//                 <h1 className="text-xl font-semibold mb-4">Expense Report</h1>
//                 <div className="flex items-center mb-4">
//                     <input type="date" value={selectedDate} onChange={handleDateChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" />
//                     <select value={selectedExpenseType} onChange={handleExpenseTypeChange} className="rounded-r-md border border-gray-300 focus:outline-none px-3 py-2 ml-2">
//                         <option value="">Select Expense Type</option>
//                         <option value="Employee">Employee</option>
//                         <option value="Routine">Routine</option>
//                         <option value="Capital">Capital</option>
//                         <option value="Raw_material">Raw Material</option>
                     
//                     </select>
//                 </div>
//             </div>

//             <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
//                 <h2 className="text-xl font-semibold p-4">Expense Data</h2>
//                 <table className="w-full table-auto">
//                     <thead>
//                         <tr>
//                             <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
//                             <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
//                             <th className="sticky top-0 px-4 py-2 bg-gray-100">Expense</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenseData.map((expense) => (
//                             <tr key={expense.id}>
//                                 <td className="border px-4 py-2 text-center">{expense.id}</td>
//                                 <td className="border px-4 py-2 text-center">{expense.date}</td>
//                                 <td className="border px-4 py-2 text-center">{expense.grandTotal}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <p className="p-4">Total Expenses: {totalExpenses}</p>
//             </div>
//         </div>
//     );
// }

// export default Ex_Daily;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ex_Daily() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedExpenseType, setSelectedExpenseType] = useState('');
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        if (selectedDate !== '') {
            fetchData();
        }
    }, [selectedDate, selectedExpenseType]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleExpenseTypeChange = (event) => {
        setSelectedExpenseType(event.target.value);
    };

    const fetchData = async () => {
        try {
            const startDate = selectedDate;
            const endDate = selectedDate;

            const response = await axios.get('http://localhost:8080/api/expenses/getDataBetweenDates', {
                params: {
                    startDate,
                    endDate,
                    expenseType: selectedExpenseType
                }
            });

            setExpenseData(response.data);
            const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
            setTotalExpenses(total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
                <h1 className="text-xl font-semibold mb-4">Expense Report</h1>
                <div className="flex items-center mb-4">
                    <input type="date" value={selectedDate} onChange={handleDateChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" />
                    <select value={selectedExpenseType} onChange={handleExpenseTypeChange} className="rounded-r-md border border-gray-300 focus:outline-none px-3 py-2 ml-2">
                        <option value="">Select Expense Type</option>
                        <option value="Employee">Employee</option>
                        <option value="Routine">Routine</option>
                        <option value="Capital">Capital</option>
                        <option value="Raw_material">Raw Material</option>
                     
                    </select>
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
                        {expenseData.map((expense) => (
                            <tr key={expense.id}>
                                <td className="border px-4 py-2 text-center">{expense.id}</td>
                                <td className="border px-4 py-2 text-center">{expense.date}</td>
                                <td className="border px-4 py-2 text-center">{expense.grandTotal}</td>
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
