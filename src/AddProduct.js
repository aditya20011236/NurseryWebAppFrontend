
import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Sidebar";
import { useNavigate } from "react-router-dom";
import host from "./util/config";

function AddProduct() {
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    date: "",
    availableQuantity: "",
    mfgPrice: "",
    sellingPrice: "",
  });
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    async function fetchLastId() {
      try {
        const response = await axios.get(host + "/products/lastId");
        setLastId(response.data);
      } catch (error) {
        console.error("Error fetching last ID:", error);
      }
    }
    fetchLastId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const newProduct = { ...product, id: lastId + 1 };
  //     await axios.post(host + "/products", newProduct);
  //     alert("Product added successfully");
  //     setProduct({
  //       productName: "",
  //       date: "",
  //       availableQuantity: "",
  //       mfgPrice: "",
  //       sellingPrice: "",
  //     });
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Check if lastId is null, if so, set it to 0
        const newProductId = lastId !== null ? lastId + 1 : 0;
        const newProduct = { ...product, id: newProductId };
        await axios.post(host + "/products", newProduct);
        alert('Product added successfully');
        setProduct({
            productName: '',
            date: '',
            availableQuantity: '',
            mfgPrice: '',
            sellingPrice: ''
        });
        navigate("/home");
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Menu />
      </div>
      <div className="w-3/4 bg-gray-100">
        <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Add New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                className="form-input w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                id="productName"
                type="text"
                placeholder="Product Name"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="form-input w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                value={product.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="availableQuantity"
              >
                Available Quantity
              </label>
              <input
                className="form-input w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                id="availableQuantity"
                type="number"
                placeholder="Available Quantity"
                name="availableQuantity"
                value={product.availableQuantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mfgPrice"
              >
                Manufacturing Price
              </label>
              <input
                className="form-input w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                id="mfgPrice"
                type="number"
                placeholder="Manufacturing Price"
                name="mfgPrice"
                value={product.mfgPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sellingPrice"
              >
                Selling Price
              </label>
              <input
                className="form-input w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                id="sellingPrice"
                type="number"
                placeholder="Selling Price"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <div className="italic bg-gray-200 rounded-lg p-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
