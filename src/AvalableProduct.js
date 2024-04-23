
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Menu from "./Sidebar";
import host from "./util/config";

function AvailableProduct() {
  const [products, setProducts] = useState([]);
  const [lowAvailabilityProducts, setLowAvailabilityProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get(host + "/products");
      const loadedProducts = result.data;
      setProducts(loadedProducts);

      const lowAvailability = loadedProducts.filter(
        (product) => product.availableQuantity < 50
      );
      setLowAvailabilityProducts(lowAvailability);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(host+"/products/"+id);
      loadProducts();
      alert("Successfully deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex">
      <Menu />
      <div className="flex-grow">
        <nav className="bg-transparent text-white p-4"></nav>
        <div className="container mx-auto py-4">
          {lowAvailabilityProducts.length > 0 && (
            <div className="bg-yellow-200 p-4 mb-4 rounded">
              <p className="text-yellow-800 font-semibold">
                {" "}
                <span className="text-black text-lg">ALERT</span>: Please start
                production for the following products:
              </p>
              <ul className="list-disc pl-4 mt-2">
                {lowAvailabilityProducts.map((product) => (
                  <li key={product.id} className="text-yellow-800">
                    {product.productName}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Id</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Available Quantity</th>
                <th className="px-4 py-2 border">Mfg Price</th>
                <th className="px-4 py-2 border">Selling Price</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 border">{product.id}</td>
                  <td className="px-4 py-2 border">{product.productName}</td>
                  <td className="px-4 py-2 border">{product.date}</td>
                  <td className="px-4 py-2 border text-center">
                    {product.availableQuantity}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {product.mfgPrice}
                  </td>
                  <td className="px-4 py-2 border flex items-center justify-center">
                    {product.sellingPrice}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                      to={{
                        pathname: `/updateproduct/${product.id}`,
                        state: { product },
                      }}
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AvailableProduct;
