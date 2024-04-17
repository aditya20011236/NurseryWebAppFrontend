
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from './Sidebar';
import host from "./util/config";
function InvoiceReport() {
    const [invoices, setInvoices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            const response = await axios.get(host +"/api/invoices");
            setInvoices(response.data);
        } catch (error) {
            console.error('Error loading invoices:', error);
        }
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.mobileNumber.includes(searchQuery)
    );

    const handleSearchChange = (e) => {
        const value = e.target.value.slice(0, 10); 
        setSearchQuery(value);
    };

    return (
        <div className="flex">
            <Menu />
            <div className="flex-grow bg-gray-100">
                <nav className="bg-gray-800 text-white p-4">
                    <h1 className="text-2xl font-semibold">Invoice Generated</h1>
                </nav>
                <div className="container mx-auto py-4">
                    <div className="mb-4">
                        <label htmlFor="mobileNumber" className="block mb-1 text-gray-700">Enter Mobile No:</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            placeholder="Search by mobile number"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            maxLength={10} 
                            className="px-4 py-2 border rounded-md w-full"
                        />
                    </div>

                    <table className="table-auto w-full border-collapse border bg-white shadow">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">Invoice No</th>
                                <th className="px-4 py-2 border">Customer Name</th>
                                <th className="px-4 py-2 border">Customer Address</th>
                                <th className="px-4 py-2 border">Mobile No</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Total Purchasing Amount</th>
                                <th className="px-4 py-2 border">Remaning Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="px-4 py-2 border text-center">{invoice.invoiceNumber}</td>
                                    <td className="px-4 py-2 border text-center">{invoice.customerName}</td>
                                    <td className="px-4 py-2 border text-center">{invoice.customerAddress}</td>
                                    <td className="px-4 py-2 border">{invoice.mobileNumber}</td>
                                    <td className="px-4 py-2 border text-center">{invoice.date}</td>
                                    <td className="px-4 py-2 border text-center">{invoice.grandtotal}</td>
                                    <td className="px-4 py-2 border text-center">{invoice.remainingAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InvoiceReport;
