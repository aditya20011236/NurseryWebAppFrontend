// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Menu from '../Sidebar';

// function ShowBooking() {
//     const [customers, setCustomers] = useState([]);

//     useEffect(() => {
//         loadCustomers();
//     }, []);

//     const loadCustomers = async () => {
//         try {
//             const result = await axios.get(host+"/api/customers");
//             // const result = await axios.get("http:// 16.170.242.6:8080/api/customers");
//             setCustomers(result.data);
//         } catch (error) {
//             console.error('Error loading customers:', error);
//         }
//     };

//     const formatCurrency = (amount) => {
//         return `₹${amount.toFixed(2)}`;
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString();
//     };

//     const handleDelete = async (customerId) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
//             // await axios.delete(`http:// 16.170.242.6:8080/api/customers/${customerId}`);
//             loadCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };
//     const generateBill = () => {
//         window.location.href = '/invoice';
//     };
//     return (
//         <div className="flex flex-col h-screen">
//             <nav className="bg-white w-full p-4 flex justify-center items-center">
//                 <div className="text-gray-800 font-bold text-xl">Advance Orders</div>
//             </nav>
//             <div className="flex">
//                 <Menu />
//                 <div className="flex-grow">
//                     <div className='container mx-auto'>
//                         <div className='py-4'>
//                             <table className="table border shadow">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-4 py-2">Order ID</th>
//                                         <th className="px-4 py-2">Date</th>
//                                         <th className="px-4 py-2">Customer Name</th>
//                                         <th className="px-4 py-2">Customer Address</th>
//                                         <th className="px-4 py-2">Customer Phone Number</th>
//                                         <th className="px-4 py-2">Plant Name</th>
//                                         <th className="px-4 py-2">Price</th>
//                                         <th className="px-4 py-2">Quantity</th>
//                                         <th className="px-4 py-2">Delivery Date</th>
//                                         <th className="px-4 py-2">Grand Total</th>
//                                         <th className="px-4 py-2">Advance Payment</th>
//                                         <th className="px-4 py-2">Remaining Payment</th>
//                                         <th className="px-4 py-2">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {customers.map((customer, index) => (
//                                         <tr key={index}>
//                                             <td className="px-4 py-2">{customer.id}</td>
//                                             <td className="px-4 py-2">{formatDate(customer.date)}</td>
//                                             <td className="px-4 py-2">{customer.customerName}</td>
//                                             <td className="px-4 py-2">{customer.customerAddress}</td>
//                                             <td className="px-4 py-2">{customer.customerPhoneNumber}</td>
//                                             <td className="px-4 py-2">{customer.plants.map(plant => plant.plantName).join(', ')}</td>
//                                             <td className="px-4 py-2">{customer.plants.map(plant => formatCurrency(plant.price)).join(', ')}</td>
//                                             <td className="px-4 py-2">{customer.plants.map(plant => plant.quantity).join(', ')}</td>
//                                             <td className="px-4 py-2">{formatDate(customer.deliveryDate)}</td>
//                                             <td className="px-4 py-2">{formatCurrency(customer.grandTotal)}</td>
//                                             <td className="px-4 py-2">{formatCurrency(customer.advancePayment)}</td>
//                                             <td className="px-4 py-2">{formatCurrency(customer.remainingPayment)}</td>
//                                             <td className="px-4 py-2">
//                                                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(customer.id)}>Deliverd</button>
//                                                 <div className="text-center mt-1">
//                                                     <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={generateBill}>Generate Bill</button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ShowBooking;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Sidebar";
import host from "../util/config";

function ShowBooking() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await axios.get(host + "/api/customers");
      setCustomers(result.data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
      loadCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const generateBill = () => {
    window.location.href = "/invoice";
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white w-full p-4 flex justify-center items-center">
        <div className="text-gray-800 font-bold text-xl">Advance Orders</div>
      </nav>
      <div className="flex">
        <Menu />
        <div className="flex-grow">
          <div className="container mx-auto">
            <div className="py-4">
              <table className="table border-collapse border w-full text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Customer Address</th>
                    <th className="border px-4 py-2">Customer Phone Number</th>
                    <th className="border px-4 py-2">Plant Name</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Delivery Date</th>
                    <th className="border px-4 py-2">Grand Total</th>
                    <th className="border px-4 py-2">Advance Payment</th>
                    <th className="border px-4 py-2">Remaining Payment</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{customer.id}</td>
                      <td className="border px-4 py-2">
                        {formatDate(customer.date)}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.customerName}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.customerAddress}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.customerPhoneNumber}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.plants
                          .map((plant) => plant.plantName)
                          .join(", ")}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.plants
                          .map((plant) => formatCurrency(plant.price))
                          .join(", ")}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.plants
                          .map((plant) => plant.quantity)
                          .join(", ")}
                      </td>
                      <td className="border px-4 py-2">
                        {formatDate(customer.deliveryDate)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatCurrency(customer.grandTotal)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatCurrency(customer.advancePayment)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatCurrency(customer.remainingPayment)}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delivered
                        </button>
                        <div className="text-center mt-1">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            onClick={generateBill}
                          >
                            Generate Bill
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBooking;
