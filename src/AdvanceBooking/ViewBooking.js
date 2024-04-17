

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Sidebar';

function ShowBooking() {
  const [customers, setCustomers] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/customers");
      setCustomers(result.data);
    } catch (error) {
      console.error('Error loading customers:', error);
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
      console.error('Error deleting customer:', error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  const generateBill = () => {
    window.location.href = "/invoice";
  };


  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-green-400 w-full p-4 flex justify-center items-center shadow-md">
        <div className="text-white font-bold text-xl">Advance Orders</div>
      </nav>

      <div className="flex">
        <Menu />
        <div className="flex-grow">
          <div className='container mx-auto'>
            <div className='py-4 overflow-x-auto'>
              <table className="table-auto w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Customer Name</th>
                    <th className="px-4 py-2 border">Customer Address</th>
                    <th className="px-4 py-2 border">Customer Phone Number</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <React.Fragment key={index}>
                      <tr className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <td className="px-4 py-2 border text-center">{customer.id}</td>
                        <td className="px-4 py-2 border text-center">{formatDate(customer.date)}</td>
                        <td className="px-4 py-2 border text-center">{customer.customerName}</td>
                        <td className="px-4 py-2 border text-center">{customer.customerAddress}</td>
                        <td className="px-4 py-2 border text-center">{customer.customerPhoneNumber}</td>
                        <td className="px-4 py-2 border text-center">
                          <button class="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline" onClick={() => toggleOrderDetails(customer.id)}>Order Details</button>
                          <br />
                          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-7 rounded mb-2 focus:outline-none focus:shadow-outline" onClick={() => handleDelete(customer.id)}> Delivered</button>
                          <br />
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline" onClick={generateBill}>Generate Bill</button>
                        </td>


                      </tr>
                      {expandedOrderId === customer.id && (
                        <tr>
                          <td colSpan="6">
                            <table className="table-auto w-full border-collapse border">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="px-4 py-2 border">Plant Name</th>
                                  <th className="px-4 py-2 border">Price</th>
                                  <th className="px-4 py-2 border">Quantity</th>
                                  <th className="px-4 py-2 border">Delivery Date</th>
                                  <th className="px-4 py-2 border">Grand Total</th>
                                  <th className="px-4 py-2 border">Advance Payment</th>
                                  <th className="px-4 py-2 border">Remaining Payment</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="px-4 py-2 border text-center">{customer.plants.map(plant => plant.plantName).join(', ')}</td>
                                  <td className="px-4 py-2 border text-center">{customer.plants.map(plant => formatCurrency(plant.price)).join(', ')}</td>
                                  <td className="px-4 py-2 border text-center">{customer.plants.map(plant => plant.quantity).join(', ')}</td>
                                  <td className="px-4 py-2 border text-center">{formatDate(customer.deliveryDate)}</td>
                                  <td className="px-4 py-2 border text-center">{formatCurrency(customer.grandTotal)}</td>
                                  <td className="px-4 py-2 border text-center">{formatCurrency(customer.advancePayment)}</td>
                                  <td className="px-4 py-2 border text-center">{formatCurrency(customer.remainingPayment)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
