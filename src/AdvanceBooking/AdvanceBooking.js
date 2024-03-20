 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Sidebar';

function AdvanceBooking() {
  const [id, setId] = useState('');
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    customerAddress: '',
    customerPhoneNumber: '',
    deliveryDate: '',
    advancePayment: '',
    discount: '',
    plants: []
  });

  useEffect(() => {
    generateId();
  }, []);

  const generateId = () => {
    const newId = Math.floor(Math.random() * 1000);
    setId(newId);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPlants = [...formData.plants];
    updatedPlants[index][name] = value;
    updatedPlants[index].totalAmount = (parseFloat(updatedPlants[index].quantity) * parseFloat(updatedPlants[index].price)).toFixed(2);
    setFormData({ ...formData, plants: updatedPlants });
  };

  const handleAddPlant = () => {
    setFormData({
      ...formData,
      plants: [...formData.plants, { plantName: '', price: '', quantity: '', totalAmount: '' }]
    });
  };

  const calculateTotal = () => {
    const subtotal = formData.plants.reduce((total, plant) => {
      return total + parseFloat(plant.totalAmount || 0);
    }, 0);
    const discountPercentage = parseFloat(formData.discount) || 0;
    const discountAmount = (subtotal * (discountPercentage / 100)).toFixed(2);
    const totalBeforeDiscount = subtotal - discountAmount;
    return totalBeforeDiscount.toFixed(2);
  };

  const calculateRemainingPayment = () => {
    const grandTotal = calculateTotal();
    const advancePayment = parseFloat(formData.advancePayment) || 0;
    return (parseFloat(grandTotal) - advancePayment).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const grandTotal = calculateTotal();
      const remainingPayment = calculateRemainingPayment();
      const dataWithId = { ...formData, id, grandTotal, remainingPayment };
      await axios.post('http://localhost:8080/api/customers', dataWithId);
      alert('Order Places Successfully!');
    } catch (error) {
      console.error('Error submitting Order:', error);
      alert('Failed to submit expenses. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 flex">
        <div className='h-screen'>
       <Menu/>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Advance Booking Details</h1>
        <form id="expenseForm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input type="date" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div>
              <label htmlFor="deliveryDate" className="block text-gray-700 text-sm font-bold mb-2">Delivery Date</label>
              <input type="date" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
              <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerName" name="customerName" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
            </div>
            <div>
              <label htmlFor="customerPhoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Customer Phone Number</label>
              <input type="tel" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerPhoneNumber" name="customerPhoneNumber" value={formData.customerPhoneNumber} onChange={(e) => setFormData({ ...formData, customerPhoneNumber: e.target.value })} />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="customerAddress" className="block text-gray-700 text-sm font-bold mb-2">Customer Address</label>
            <textarea className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}></textarea>
          </div>
          {formData.plants.map((plant, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <label htmlFor={`plantName${index}`} className="block text-gray-700 text-sm font-bold mb-2">Plant Name</label>
                <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`plantName${index}`} name="plantName" value={plant.plantName} onChange={(e) => handleInputChange(index, e)} />
              </div>
              <div>
                <label htmlFor={`price${index}`} className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`price${index}`} name="price" value={plant.price} onChange={(e) => handleInputChange(index, e)} />
              </div>
              <div>
                <label htmlFor={`quantity${index}`} className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`quantity${index}`} name="quantity" value={plant.quantity} onChange={(e) => handleInputChange(index, e)} />
              </div>
              <div>
                <label htmlFor={`totalAmount${index}`} className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
                <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`totalAmount${index}`} name="totalAmount" value={plant.totalAmount} readOnly />
              </div>
            </div>
          ))}
          <div className="mb-6">
            <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddPlant}>Add Plant</button>
          </div>
          <div className="flex justify-end mb-6">
            <table className="table-auto">
              <tfoot>
                <tr>
                  <td className="text-right font-bold pr-4">Grand Total:</td>
                  <td className="border px-4 py-2">{calculateTotal()}</td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-4">Discount (%):</td>
                  <td className="border px-4 py-2">
                    <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="discount" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-4">Advance Payment:</td>
                  <td className="border px-4 py-2">
                    <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="advancePayment" value={formData.advancePayment} onChange={(e) => setFormData({ ...formData, advancePayment: e.target.value })} />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-4">Remaining Payment:</td>
                  <td className="border px-4 py-2">{calculateRemainingPayment()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvanceBooking;
