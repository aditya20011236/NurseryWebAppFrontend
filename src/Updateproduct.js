import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from './Sidebar';

function EditProduct() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        date: '',
        availableQuantity: '',
        mfgPrice: '',
        sellingPrice: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        loadProduct();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.put(`http://localhost:8080/products/${id}`, product);
            await axios.put(`http://16.170.242.6:8080/products/${id}`, product);
            alert('Product updated successfully');
            // Reset form fields
            setProduct({
                productName: '',
                date: '',
                availableQuantity: '',
                mfgPrice: '',
                sellingPrice: ''
            });
            navigate("/home");
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
   
    const loadProduct = async () => {
        try {
            // const response = await axios.get(`http://localhost:8080/products/${id}`);
            const response = await axios.get(`http://16.170.242.6:8080/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
   
    return (
        <div className="flex">
            <div className="w-1/4">
                <Menu />
            </div>
            <div className="w-3/4 bg-gray-100">
                <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-8 text-center">Update Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableQuantity">
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mfgPrice">
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sellingPrice">
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
                                    Update Product
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
