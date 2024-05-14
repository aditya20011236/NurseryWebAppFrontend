
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Sidebar';
import host from "../util/config"

const ShowBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [invoiceNo, setlatestInvoiceNoA] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(host+'/viewalladvancebooking');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  useEffect(() =>{
  const fetchLatestInvoiceNo = async () => {
    try {
      const response = await axios.get(host + "/api/invoices/latest");
    
     const InvoiceNum =  response.data;
     const latestInvoiceNo =parseInt(InvoiceNum);
     setlatestInvoiceNoA(latestInvoiceNo+ 1);
     
     
        
      
    } catch (error) {
      console.error("Error fetching latest invoice number:", error);
    }
  };
  fetchLatestInvoiceNo();
}, []);

  
// const handleDelivery = async (bookingId) => {
//   try {
//     console.log('Fetching booking data with ID:', bookingId); // Log bookingId
//     const response = await axios.get(host + `/booking/${bookingId}`);
//     const advanceBookingData = response.data; // Assuming the data fetched is the advance booking data
//     console.log('Advance Booking Data:', advanceBookingData);

//     // Adding status field to the booking data
//     const updatedBookingData = {
//       ...advanceBookingData,
//       invoiceType: 'closed_booking',
//       status: 'delivered',
//       id: invoiceNo
//     };

//     // Now you can post the advance booking data to your desired endpoint
//     await axios.post(host + "/api/invoices", updatedBookingData);

//     // Optionally, you can remove the booking from the UI after successful posting
//     setBookings(bookings.filter(booking => booking.id !== bookingId));

//     setPopupMessage('Record posted successfully.');
//   } catch (error) {
//     console.error('Error posting advance booking:', error);
//     setError(`Error posting advance booking: ${error.message}`);
//   }
// };


const handleDelivery = async (bookingId) => {
  try {
    console.log('Fetching booking data with ID:', bookingId);
    const response = await axios.get(host + `/booking/${bookingId}`);
    const advanceBookingData = response.data;

    // Deduct quantity from products API
    for (const product of advanceBookingData.products) {
      if (!product.productId) {
        console.warn('Skipping product deduction: productId is null or undefined.');
        continue; // Skip this product and continue to the next one
      }

      try {
        await axios.put(host + `/products/deductQuantity`, {
          productId: product.productId,
          quantity: product.quantity
        });
      } catch (error) {
        console.error('Error deducting quantity:', error.response ? error.response.data : error.message);
        throw new Error('Error deducting quantity. Please try again later.');
      }
    }

    // Adding status field to the booking data
    const updatedBookingData = {
      ...advanceBookingData,
      invoiceType: 'closed_booking',
      status: 'delivered',
      id: invoiceNo
    };

    // Now you can post the advance booking data to your desired endpoint
    await axios.post(host + "/api/invoices", updatedBookingData);

    // Optionally, you can remove the booking from the UI after successful posting
    setBookings(bookings.filter(booking => booking.id !== bookingId));

    setPopupMessage('Record posted successfully.');
  } catch (error) {
    console.error('Error posting advance booking:', error);
    setError(`Error posting advance booking: ${error.message}`);
  }
};


const handleCancellation = async (bookingId) => {
  try {
    console.log('Fetching booking data with ID:', bookingId);
    const response = await axios.get(host + `/booking/${bookingId}`);
    const advanceBookingData = response.data;

    // Generate random 3-digit code
    const randomCode = Math.floor(100 + Math.random() * 900);

    // Display pop-up to enter code
    const enteredCode = prompt(`Enter the following code: ${randomCode}`);
    if (enteredCode !== null && enteredCode === randomCode.toString()) {
      const eligibleForRefund = window.confirm('Does the customer eligible for a refund?');
      if (eligibleForRefund) {
        const refundAmount = prompt('Enter refund amount:');
        if (refundAmount !== null) {
          const updatedAmountPaid = advanceBookingData.amountPaid - parseFloat(refundAmount);
          const updatedData = {
            ...advanceBookingData,
            invoiceType: 'canceled_booking',
            status: 'canceled',
            amountPaid: updatedAmountPaid < 0 ? 0 : updatedAmountPaid
          };

          // Post updated data to API
          await axios.post(host + "/api/invoices", updatedData);
          setPopupMessage('Booking canceled successfully.');
        }
      } else {
        // If not eligible for refund, post data directly to API
        await axios.post(host + "/api/invoices", {
          ...advanceBookingData,
          invoiceType: 'canceled_booking',
          status: 'canceled'
        });
        setPopupMessage('Booking canceled successfully.');
      }
    } else {
      setPopupMessage('You entered the wrong code. Try again later.');
    }
  } catch (error) {
    console.error('Error canceling booking:', error);
    setError(`Error canceling booking: ${error.message}`);
  }
};



  const renderAdditionalDetails = (booking) => {
    if (expandedBooking === booking.id) {
      return (
        <tr>
          <td colSpan="14">
            <div className="px-4 py-2">
              <table className="table-auto w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    {/* <th className="px-4 py-2 border">Invoice Number</th> */}
                    <th className="px-4 py-2 border">Product Name</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Delivery Date</th>
                    <th className="px-4 py-2 border">Amount Paid</th>
                    <th className="px-4 py-2 border">Remaining Amount</th>
                    <th className="px-4 py-2 border">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.products.map((product) => (
                    <tr key={product.id}>
                      {/* <td className="px-4 py-2 border text-center">{booking.invoiceNumber}</td> */}
                      <td className="px-4 py-2 border text-center">{product.productName}</td>
                      <td className="px-4 py-2 border text-center">{product.price}</td>
                      <td className="px-4 py-2 border text-center">{product.quantity}</td>
                      <td className="px-4 py-2 border text-center">{product.price * product.quantity}</td>
                      <td className="px-4 py-2 border text-center">{booking.deliveryDate}</td>
                      <td className="px-4 py-2 border text-center">{booking.amountPaid}</td>
                      <td className="px-4 py-2 border text-center">{booking.remainingAmount}</td>
                      <td className="px-4 py-2 border text-center">{booking.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  const closePopupMessage = () => {
    setPopupMessage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Customer Name</th>
                    <th className="px-4 py-2 border">Customer Address</th>
                    <th className="px-4 py-2 border">Booking Date</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <React.Fragment key={booking.id}>
                      <tr>
                        <td className="px-4 py-2 border text-center">{booking.invoiceNumber}</td>
                        <td className="px-4 py-2 border text-center">{booking.customerName}</td>
                        <td className="px-4 py-2 border text-center">{booking.customerAddress}</td>
                        <td className="px-4 py-2 border text-center">{booking.date}</td>
                        <td className="px-4 py-2 border text-center">
                          <button onClick={() => toggleDetails(booking.id)} className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline">Order Details</button>
                          <button onClick={() => handleDelivery(booking.id)} className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline">Delivered</button>
                          <button onClick={() => handleCancellation(booking.id)} className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none focus:shadow-outline">Cancel</button>
                        </td>
                      </tr>
                      {renderAdditionalDetails(booking)}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
            <div className="flex justify-between items-center">
              <span>{popupMessage}</span>
              <button onClick={closePopupMessage} className="text-red-500">&times;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBooking;
