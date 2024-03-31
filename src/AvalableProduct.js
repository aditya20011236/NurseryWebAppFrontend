
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Menu from './Sidebar';



function AvailableProduct() {
    const [products, setProducts] = useState([]);
    const [updateProductId, setUpdateProductId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            // const result = await axios.get("http://localhost:8080/products");
            const result = await axios.get("http://16.170.242.6:8080/products");
            setProducts(result.data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            loadProducts();
            alert('Successfully deleted');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const openUpdateForm = (id) => {
        console.log('Update button clicked for product ID:', id);
        setUpdateProductId(id);
    };

    return (
        <div className="flex">
            <Menu />
            <div className="flex-grow">
                <nav className="bg-transparent text-white p-4"></nav>
                <div className="container mx-auto py-4">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Available Quantity</th>
                                <th className="px-4 py-2">Mfg Price</th>
                                <th className="px-4 py-2">Selling Price</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{product.id}</td>
                                    <td className="px-4 py-2">{product.productName}</td>
                                    <td className="px-4 py-2">{product.date}</td>
                                    <td className="px-4 py-2 text-center align-middle">{product.availableQuantity}</td>
                                    <td className="px-4 py-2">{product.mfgPrice}</td>
                                    <td className="px-4 py-2 text-center align-middle">{product.sellingPrice}</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            className='bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600'
                                            to={{
                                                pathname: `/updateproduct/${product.id}`,
                                                state: { product }
                                            }}
                                        >
                                            Update
                                        </Link>

                                        <button
                                            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
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
            {/* {updateProductId && <UpdateProductForm productId={updateProductId} />} */}
        </div>
    );
}

export default AvailableProduct;
