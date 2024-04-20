
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Sidebar';

const ShowBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewalladvancebooking');
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

  const handleDelivery = async (bookingId) => {
    try {
      console.log('Deleting booking with ID:', bookingId); // Log bookingId
      await axios.delete(`http://localhost:8080/booking/${bookingId}`);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      setPopupMessage('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError(`Error deleting booking: ${error.message}`);
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
