// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Menu from '../Sidebar';

// // function AdvanceBooking() {
// //   const [id, setId] = useState('');
// //   const [products, setProducts] = useState([]);
// //   const [formData, setFormData] = useState({
// //     date: '',
// //     customerName: '',
// //     customerAddress: '',
// //     customerPhoneNumber: '',
// //     deliveryDate: '',
// //     advancePayment: '',
// //     discount: '',
// //     plants: []
// //   });

// //   useEffect(() => {
// //     generateId();
// //     fetchProducts();
// //   }, []);

// //   const generateId = () => {
// //     const newId = Math.floor(Math.random() * 1000);
// //     setId(newId);
// //   };

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get(host+'/products');
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   // const handleInputChange = (index, event) => {
// //   //   const { name, value } = event.target;
// //   //   const updatedPlants = [...formData.plants];
// //   //   updatedPlants[index][name] = value;
// //   //   if (name === 'plantName') {
// //   //     const selectedProduct = products.find(product => product.productName === value);
// //   //     if (selectedProduct) {
// //   //       updatedPlants[index].price = selectedProduct.sellingPrice;
// //   //     }
// //   //   }
// //   //   updatedPlants[index].totalAmount = (parseFloat(updatedPlants[index].quantity) * parseFloat(updatedPlants[index].price)).toFixed(2);
// //   //   setFormData({ ...formData, plants: updatedPlants });
// //   // };
// //   // const handleInputChange = (index, event) => {
// //   //   const { name, value } = event.target;
// //   //   const updatedPlants = [...formData.plants];
// //   //   updatedPlants[index][name] = value;

// //   //   if (name === 'plantName') {
// //   //     const selectedProduct = products.find(product => product.productName === value);
// //   //     if (selectedProduct) {
// //   //       updatedPlants[index].price = selectedProduct.sellingPrice;
// //   //       updatedPlants[index].quantity = selectedProduct.availableQuantity.toString(); // Set quantity to available quantity
// //   //     }
// //   //   }

// //   //   updatedPlants[index].totalAmount = (
// //   //     parseFloat(updatedPlants[index].quantity) * parseFloat(updatedPlants[index].price)
// //   //   ).toFixed(2);

// //   //   setFormData({ ...formData, plants: updatedPlants });
// //   // };
// //   const handleInputChange = (index, event) => {
// //     const { name, value } = event.target;
// //     const updatedPlants = [...formData.plants];
// //     updatedPlants[index][name] = value;

// //     if (name === 'plantName') {
// //       const selectedProduct = products.find(product => product.productName === value);
// //       if (selectedProduct) {
// //         updatedPlants[index].price = selectedProduct.sellingPrice;
// //         updatedPlants[index].quantity = selectedProduct.availableQuantity.toString(); // Set quantity to available quantity
// //       }
// //     }

// //     // Ensure quantity does not exceed available quantity
// //     if (name === 'quantity') {
// //       const selectedProduct = products.find(product => product.productName === updatedPlants[index].plantName);
// //       if (selectedProduct && parseInt(value) > selectedProduct.availableQuantity) {
// //         alert(`Quantity cannot above available quantity (${selectedProduct.availableQuantity})`);
// //         updatedPlants[index].quantity = selectedProduct.availableQuantity.toString();
// //       }
// //     }

// //     updatedPlants[index].totalAmount = (
// //       parseFloat(updatedPlants[index].quantity) * parseFloat(updatedPlants[index].price)
// //     ).toFixed(2);

// //     setFormData({ ...formData, plants: updatedPlants });
// //   };

// //   const handleAddPlant = () => {
// //     setFormData({
// //       ...formData,
// //       plants: [...formData.plants, { plantName: '', price: '', quantity: '', totalAmount: '' }]
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Deduct quantity from available quantity
// //       formData.plants.forEach(async plant => {
// //         await axios.put(`http://localhost:8080/products/${products.find(product => product.productName === plant.plantName).id}`, {
// //           ...products.find(product => product.productName === plant.plantName),
// //           availableQuantity: products.find(product => product.productName === plant.plantName).availableQuantity - parseInt(plant.quantity)
// //         });
// //       });

// //       const grandTotal = calculateTotal();
// //       const remainingPayment = calculateRemainingPayment();
// //       const dataWithId = { ...formData, id, grandTotal, remainingPayment };
// //       await axios.post(host+'/api/customers', dataWithId);
// //       alert('Order Places Successfully!');
// //     } catch (error) {
// //       console.error('Error submitting Order:', error);
// //       alert('Failed to submit expenses. Please try again later.');
// //     }
// //   };

// //   const calculateTotal = () => {
// //     const subtotal = formData.plants.reduce((total, plant) => {
// //       return total + parseFloat(plant.totalAmount || 0);
// //     }, 0);
// //     const discountPercentage = parseFloat(formData.discount) || 0;
// //     const discountAmount = (subtotal * (discountPercentage / 100)).toFixed(2);
// //     const totalBeforeDiscount = subtotal - discountAmount;
// //     return totalBeforeDiscount.toFixed(2);
// //   };

// //   const calculateRemainingPayment = () => {
// //     const grandTotal = calculateTotal();
// //     const advancePayment = parseFloat(formData.advancePayment) || 0;
// //     return (parseFloat(grandTotal) - advancePayment).toFixed(2);
// //   };
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Menu from '../Sidebar';

// function AdvanceBooking() {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     customerName: '',
//     customerAddress: '',
//     customerPhoneNumber: '',
//     deliveryDate: '',
//     advancePayment: '',
//     discount: '',
//     plants: []
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(host+'/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedPlants = [...formData.plants];
//     updatedPlants[index][name] = value;

//     if (name === 'plantName') {
//       const selectedProduct = products.find(product => product.productName === value);
//       if (selectedProduct) {
//         updatedPlants[index].price = selectedProduct.sellingPrice;
//         updatedPlants[index].quantity = selectedProduct.availableQuantity.toString();
//       }
//     }

//     if (name === 'quantity') {
//       const selectedProduct = products.find(product => product.productName === updatedPlants[index].plantName);
//       if (selectedProduct && parseInt(value) > selectedProduct.availableQuantity) {
//         alert(`Quantity cannot exceed available quantity (${selectedProduct.availableQuantity})`);
//         updatedPlants[index].quantity = selectedProduct.availableQuantity.toString();
//       }
//     }

//     updatedPlants[index].totalAmount = (
//       parseFloat(updatedPlants[index].quantity) * parseFloat(updatedPlants[index].price)
//     ).toFixed(2);

//     setFormData({ ...formData, plants: updatedPlants });
//   };

//   const handleAddPlant = () => {
//     setFormData({
//       ...formData,
//       plants: [...formData.plants, { plantName: '', price: '', quantity: '', totalAmount: '' }]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       formData.plants.forEach(async plant => {
//         await axios.put(`http://localhost:8080/products/${products.find(product => product.productName === plant.plantName).id}`, {
//           ...products.find(product => product.productName === plant.plantName),
//           availableQuantity: products.find(product => product.productName === plant.plantName).availableQuantity - parseInt(plant.quantity)
//         });
//       });

//       const grandTotal = calculateTotal();
//       const remainingPayment = calculateRemainingPayment();
//       const dataWithId = { ...formData, grandTotal, remainingPayment };
//       await axios.post(host+'/api/customers', dataWithId);
//       alert('Order Placed Successfully!');
//     } catch (error) {
//       console.error('Error submitting Order:', error);
//       alert('Failed to submit expenses. Please try again later.');
//     }
//   };

//   const calculateTotal = () => {
//     const subtotal = formData.plants.reduce((total, plant) => {
//       return total + parseFloat(plant.totalAmount || 0);
//     }, 0);
//     const discountPercentage = parseFloat(formData.discount) || 0;
//     const discountAmount = (subtotal * (discountPercentage / 100)).toFixed(2);
//     const totalBeforeDiscount = subtotal - discountAmount;
//     return totalBeforeDiscount.toFixed(2);
//   };

//   const calculateRemainingPayment = () => {
//     const grandTotal = calculateTotal();
//     const advancePayment = parseFloat(formData.advancePayment) || 0;
//     return (parseFloat(grandTotal) - advancePayment).toFixed(2);
//   };
//     return (
//       <div className="container mx-auto mt-10 px-4 flex">
//       <div className='h-screen'>
//      <Menu/>
//     </div>
//     <div className="bg-white rounded-lg shadow-md p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Advance Booking Details</h1>
//       <form id="expenseForm" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Booking Date</label>
//             <input type="date" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//           </div>
//           <div>
//             <label htmlFor="deliveryDate" className="block text-gray-700 text-sm font-bold mb-2">Delivery Date</label>
//             <input type="date" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
//             <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerName" name="customerName" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
//           </div>
//           <div>
//             <label htmlFor="customerPhoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Customer Phone Number</label>
//             <input type="tel" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerPhoneNumber" name="customerPhoneNumber" value={formData.customerPhoneNumber} onChange={(e) => setFormData({ ...formData, customerPhoneNumber: e.target.value })} />
//           </div>
//         </div>
//         <div className="mb-6">
//           <label htmlFor="customerAddress" className="block text-gray-700 text-sm font-bold mb-2">Customer Address</label>
//           <textarea className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}></textarea>
//         </div>
//         {formData.plants.map((plant, index) => (
//           <div key={index} className="grid grid-cols-4 gap-4 mb-6">
//             <div>
//               <label htmlFor={`plantName${index}`} className="block text-gray-700 text-sm font-bold mb-2">Plant Name</label>
//               <select
//                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id={`plantName${index}`}
//                 name="plantName"
//                 value={plant.plantName}
//                 onChange={(e) => handleInputChange(index, e)}
//               >
//                 <option value="">Select a product</option>
//                 {products.map(product => (
//                   <option key={product.id} value={product.productName}>{product.productName}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor={`price${index}`} className="block text-gray-700 text-sm font-bold mb-2">Price</label>
//               <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`price${index}`} name="price" value={plant.price} onChange={(e) => handleInputChange(index, e)} readOnly />
//             </div>
//             <div>
//               <label htmlFor={`quantity${index}`} className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
//               <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`quantity${index}`} name="quantity" value={plant.quantity} onChange={(e) => handleInputChange(index, e)} />
//             </div>
//             <div>
//               <label htmlFor={`totalAmount${index}`} className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
//               <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`totalAmount${index}`} name="totalAmount" value={plant.totalAmount} readOnly />
//             </div>
//           </div>
//         ))}
//         <div className="mb-6">
//           <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddPlant}>Add Order</button>
//         </div>
//         <div className="flex justify-end mb-6">
//           <table className="table-auto">
//             <tfoot>
//               <tr>
//                 <td className="text-right font-bold pr-4">Grand Total:</td>
//                 <td className="border px-4 py-2">{calculateTotal()}</td>
//               </tr>
//               <tr>
//                 <td className="text-right font-bold pr-4">Discount (%):</td>
//                 <td className="border px-4 py-2">
//                   <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="discount" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text-right font-bold pr-4">Advance Payment:</td>
//                 <td className="border px-4 py-2">
//                   <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="advancePayment" value={formData.advancePayment} onChange={(e) => setFormData({ ...formData, advancePayment: e.target.value })} />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text-right font-bold pr-4">Balance Amount:</td>
//                 <td className="border px-4 py-2">{calculateRemainingPayment()}</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//         <div className="text-center">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//         </div>
//       </form>
//     </div>
//   </div>
// );
// }

// export default AdvanceBooking;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Sidebar";
import host from "../util/config";

function AdvanceBooking() {
  const [id, setId] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    customerAddress: "",
    customerPhoneNumber: "",
    deliveryDate: "",
    advancePayment: "",
    discount: "",
    plants: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchLatestId();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(host + "/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchLatestId = async () => {
    try {
      const response = await axios.get(host + "/api/customers/latestId");
      const latestId = response.data.latestId;
      setId(latestId + 1); // Increment latest ID by 1 to generate a new ID
    } catch (error) {
      console.error("Error fetching latest ID:", error);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPlants = [...formData.plants];
    updatedPlants[index][name] = value;

    if (name === "plantName") {
      const selectedProduct = products.find(
        (product) => product.productName === value
      );
      if (selectedProduct) {
        updatedPlants[index].price = selectedProduct.sellingPrice;
        updatedPlants[index].quantity =
          selectedProduct.availableQuantity.toString(); // Set quantity to available quantity
      }
    }

    if (name === "quantity") {
      const selectedProduct = products.find(
        (product) => product.productName === updatedPlants[index].plantName
      );
      if (
        selectedProduct &&
        parseInt(value) > selectedProduct.availableQuantity
      ) {
        alert(
          `Quantity cannot be above available quantity (${selectedProduct.availableQuantity})`
        );
        updatedPlants[index].quantity =
          selectedProduct.availableQuantity.toString();
      }
    }

    updatedPlants[index].totalAmount = (
      parseFloat(updatedPlants[index].quantity) *
      parseFloat(updatedPlants[index].price)
    ).toFixed(2);

    setFormData({ ...formData, plants: updatedPlants });
  };

  const handleAddPlant = () => {
    setFormData({
      ...formData,
      plants: [
        ...formData.plants,
        { plantName: "", price: "", quantity: "", totalAmount: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.plants.forEach(async (plant) => {
        await axios.put(
          `http://localhost:8080/products/${
            products.find((product) => product.productName === plant.plantName)
              .id
          }`,
          {
            ...products.find(
              (product) => product.productName === plant.plantName
            ),
            availableQuantity:
              products.find(
                (product) => product.productName === plant.plantName
              ).availableQuantity - parseInt(plant.quantity),
          }
        );
      });

      const grandTotal = calculateTotal();
      const remainingPayment = calculateRemainingPayment();
      const dataWithId = { ...formData, id, grandTotal, remainingPayment };
      await axios.post(host + "/api/customers", dataWithId);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again later.");
    }
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

  return (
    <div className="container mx-auto mt-10 px-4 flex">
      <div className="h-screen">
        <Menu />
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Advance Booking Details
        </h1>
        <form id="expenseForm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Booking Date
              </label>
              <input
                type="date"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Delivery Date
              </label>
              <input
                type="date"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="customerName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Customer Name
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="customerPhoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Customer Phone Number
              </label>
              <input
                type="tel"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="customerPhoneNumber"
                name="customerPhoneNumber"
                value={formData.customerPhoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerPhoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="customerAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Customer Address
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={(e) =>
                setFormData({ ...formData, customerAddress: e.target.value })
              }
            ></textarea>
          </div>
          {formData.plants.map((plant, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <label
                  htmlFor={`plantName${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Plant Name
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`plantName${index}`}
                  name="plantName"
                  value={plant.plantName}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor={`price${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`price${index}`}
                  name="price"
                  value={plant.price}
                  onChange={(e) => handleInputChange(index, e)}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor={`quantity${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`quantity${index}`}
                  name="quantity"
                  value={plant.quantity}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <label
                  htmlFor={`totalAmount${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Total Amount
                </label>
                <input
                  type="number"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`totalAmount${index}`}
                  name="totalAmount"
                  value={plant.totalAmount}
                  readOnly
                />
              </div>
            </div>
          ))}
          <div className="mb-6">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddPlant}
            >
              Add Order
            </button>
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
                    <input
                      type="number"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="discount"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-4">
                    Advance Payment:
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="advancePayment"
                      value={formData.advancePayment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          advancePayment: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right font-bold pr-4">Balance Amount:</td>
                  <td className="border px-4 py-2">
                    {calculateRemainingPayment()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvanceBooking;
