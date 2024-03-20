
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Logo from './Logo.png';
import SignatureImage from './Signpdf.jpg';
import { v4 as uuidv4 } from 'uuid';
import Menu from './Sidebar';

function Invoice() {
  const [invoiceNo, setInvoiceNo] = useState(0);

  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    invoiceNo: '',
    date: '',
    products: [{
      srNo: 1,
      productName: '',
      price: '',
      quantity: '',
      total: ''
    }],
    amountPaid: '',
    remainingAmount: '',
    paymentMode: '',
    discount: ''
  });

  useEffect(() => {
    generateInvoiceNo(); // Generate invoice number on component mount
  }, []);

  const generateInvoiceNo = () => {
    let latestInvoiceNo = localStorage.getItem('latestInvoiceNo');
    if (!latestInvoiceNo) {
      latestInvoiceNo = 0;
    }
    const newInvoiceNo = parseInt(latestInvoiceNo, 10) + 1;
    localStorage.setItem('latestInvoiceNo', newInvoiceNo);
    setInvoiceNo(newInvoiceNo);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const products = [...formData.products];
    products[index][name] = value;
    setFormData({ ...formData, products });
  };

  const handleAddRow = () => {
    const products = [...formData.products, { srNo: formData.products.length + 1, productName: '', price: '', quantity: '', total: '' }];
    setFormData({ ...formData, products });
  };

  const calculateTotal = () => {
    let grandTotal = 0;
    formData.products.forEach(product => {
      const total = parseFloat(product.quantity) * parseFloat(product.price);
      grandTotal += isNaN(total) ? 0 : total;
      product.total = isNaN(total) ? '' : total.toFixed(2);
    });
    // Apply discount if available
    if (formData.discount && formData.discount > 0 && formData.discount <= 100) {
      const discountAmount = (grandTotal * (formData.discount / 100)).toFixed(2);
      grandTotal -= parseFloat(discountAmount);
    }
    return grandTotal.toFixed(2);
  };

  const numberToWords = (number) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (number === 0) {
      return 'Zero';
    }

    let words = '';

    if (number >= 1000) {
      words += numberToWords(Math.floor(number / 1000)) + ' Thousand ';
      number %= 1000;
    }

    if (number >= 100) {
      words += units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
    }

    if (number >= 10) {
      words += teens[number - 10] + ' ';
      number = 0;
    }

    if (number > 0) {
      words += units[number] + ' ';
    }

    return words.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoiceData = { ...formData, invoiceNo }; 
      await axios.post('http://localhost:8080/api/invoices', formData);
      alert('Invoice submitted successfully!');
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert('Failed to submit invoice. Please try again later.');
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amountPaid') {
      const remainingAmount = (calculateTotal() - parseFloat(value)).toFixed(2);
      setFormData({ ...formData, amountPaid: value, remainingAmount });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = (grandTotal, billNo, customerName) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    pdf.setFont('Helvetica');
    const borderWidth = 0.5;
    const borderColor = '#333';
    pdf.setLineWidth(borderWidth);
    pdf.setDrawColor(borderColor);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'S');
    const img = new Image();
    img.src = Logo;
    pdf.addImage(img, 'PNG', 10, 10, 40, 40);
    pdf.setFontSize(10);
    pdf.setTextColor('#000');

    const topRightX = pdf.internal.pageSize.getWidth() - 60;
    const topRightY = 10;
    pdf.setFont('bold');
    pdf.text("Shree Samarth Nursury", topRightX, topRightY);
    pdf.text("Nira-Lonand Road, At.Po,Padegaon", topRightX, topRightY + 5);
    pdf.text("Tal. Khandala, Dist. Satara, 415521", topRightX, topRightY + 10);
    pdf.text("Phone: 9730465591", topRightX, topRightY + 15);

    pdf.setTextColor('#000');
    pdf.setFont('bold');
    pdf.text(`Invoice to:`, 15, 60);
    pdf.setFont('normal');
    const customerNameX = 15; // Adjust X position for Customer Name
    const customerAddressX = 15; // Adjust X position for Customer Address
    pdf.text(`Customer Name: ${formData.customerName}`, customerNameX, 70);
    pdf.text(`Customer Address: ${formData.customerAddress}`, customerAddressX, 75);

    pdf.text(`Invoice No: ${invoiceNo}`, 150, 70);

    const formattedDate = formData.date.split('-').reverse().join('-');
    pdf.text(`Date: ${formattedDate}`, 150, 75);

    let y = 85;
    const grandTotalRow = ['', '', '', '', ''];
    pdf.autoTable({
      startY: y,
      head: [['Sr No', 'Item Name', 'Price (Rs)', 'Quantity', 'Total (Rs)']],
      body: [
        ...formData.products
          .filter(product => product.productName || product.price || product.quantity || product.total)
          .map(product => [product.srNo, product.productName, product.price, product.quantity, product.total]),
        grandTotalRow
      ],
      theme: 'grid',
      styles: { halign: 'center', valign: 'middle', fontSize: 10 },
      columnStyles: {
        0: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' }
      },
      didDrawCell: function (data) {
        if (data.row.index === formData.products.length) {
          if (data.column.index === 0) {
            pdf.setFont('bold');
            pdf.text('', data.cell.x + 2, data.cell.y + data.cell.height / 2, { align: 'left', baseline: 'middle' });
          } else if (data.column.index === 3) {
            pdf.setFont('bold');
            pdf.text('Grand Total', data.cell.x + 2, data.cell.y + data.cell.height / 2, { align: 'left', baseline: 'middle' });
          } else if (data.column.index === 4) {
            const grandTotalTextWidth = pdf.getStringUnitWidth(grandTotal.toFixed(2)) * pdf.internal.scaleFactor;
            const cellWidth = data.cell.width - data.cell.padding('horizontal');
            const startX = data.cell.x + cellWidth / 1.3 - grandTotalTextWidth / 2;
            pdf.setFont('bold');
            pdf.text(grandTotal.toFixed(2), startX, data.cell.y + data.cell.height / 2, { align: 'center', baseline: 'middle' });
          }
        }
      },
      margin: { bottom: 30 }
    });



    y = pdf.autoTable.previous.finalY;
    const totalAmountWords = numberToWords(parseFloat(grandTotal));

    const additionalDetailsData = [
      ['Amount Paid:', formData.amountPaid],
      ['Remaining Amount:', formData.remainingAmount],
      ['Payment Mode:', formData.paymentMode],
      ['Discount (%):', `${formData.discount}%`]
    ];

    const additionalDetailsWidth = 90;
    const additionalDetailsHeight = additionalDetailsData.length * 10;
    const additionalDetailsX = pdf.internal.pageSize.getWidth() - additionalDetailsWidth - 10;
    const bankDetailsY = y + 10 + additionalDetailsHeight + 10;
    const signatureY = bankDetailsY + 15;

    // Total Amount (In Words) styling
    pdf.setFontSize(11);
    pdf.setFont('normal');
    const totalAmountY = pdf.autoTable.previous.finalY + 7;

    // Adjust the vertical position for visibility
    const marginTop = 0;
    pdf.text("Total Amount (In Words):", 15, totalAmountY + marginTop);

    // Apply different styling or font for the total amount in words
    pdf.setTextColor('#000');
    pdf.setFontSize(10);
    pdf.setFont('bold');
    pdf.text(`${totalAmountWords} Rs`, 60, totalAmountY + marginTop);

    pdf.autoTable({
      body: additionalDetailsData,
      startY: y + 10,
      theme: 'grid',
      styles: { halign: 'left', valign: 'middle', fontSize: 10 },
      columnStyles: { 0: { halign: 'left', fontStyle: 'bold', cellWidth: 'wrap' } },
      margin: { bottom: 30 },
      tableWidth: additionalDetailsWidth,
      startX: additionalDetailsX
    });

    pdf.setLineWidth(0.2);
    pdf.setDrawColor('#000');
    pdf.rect(10, bankDetailsY, pdf.internal.pageSize.getWidth() - 20, 40, 'S');
    pdf.setFontSize(10);
    pdf.setFont('bold');
    pdf.text("Bank Details", 15, bankDetailsY + 10);
    pdf.setFont('normal');
    pdf.text("Name: BANK OF BARODA", 15, bankDetailsY + 15);
    pdf.text("Account No: 04440200000597", 15, bankDetailsY + 20);
    pdf.text("IFSC code: BARB0LONAND", 15, bankDetailsY + 25);
    pdf.setFont('bold');
    pdf.text("For:Shree Samarth Nursury", pdf.internal.pageSize.width - 80, bankDetailsY + 10);
    pdf.addImage(SignatureImage, 'JPG', pdf.internal.pageSize.width - 80, bankDetailsY + 15, 30, 15);
    pdf.setFontSize(10);
    pdf.text("Authorized Signature", pdf.internal.pageSize.width - 75, bankDetailsY + 36);

    const additionalMessage = "This is Computer generated bill.";
    const additionalMessageWidth = pdf.getStringUnitWidth(additionalMessage) * 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(10);
    const shiftRight = 20;
    const textXAdditional = (pageWidth - additionalMessageWidth) / 1.3 + shiftRight;
    const textY = pageHeight - 5; // Adjust the Y position to place it below the footer
    pdf.text(additionalMessage, textXAdditional, textY);

    pdf.save(`${invoiceNo}-${customerName}.pdf`);

    // Generate next invoice number for the next invoice
    generateInvoiceNo();
  };
  
  

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className='ml-0 h-screen'>
        <Menu />
      </div>
      <div className="container mx-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 text-center font-bold">Invoice</h1>
        <form id="invoiceForm" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Information */}
          <div>
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Customer Name</label>
            <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerName" name="customerName" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="customerAddress" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Customer Address</label>
            <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })} />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Date</label>
            <input type="date" className="appearance-none border rounded w-32 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>

          {/* Products Table */}
          <table className="table-auto w-full mb-4 col-span-2">
            {/* Table Headers */}
            <thead>
              <tr>
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Price (Rs)</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total (Rs)</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {formData.products.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{product.srNo}</td>
                  <td className="border px-4 py-2"><input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="productName" value={product.productName} onChange={(e) => handleInputChange(index, e)} /></td>
                  <td className="border px-4 py-2"><input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="price" value={product.price} onChange={(e) => handleInputChange(index, e)} /></td>
                  <td className="border px-4 py-2"><input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="quantity" value={product.quantity} onChange={(e) => handleInputChange(index, e)} /></td>
                  <td className="border px-4 py-2"><input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={product.total} readOnly /></td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer */}
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right font-bold">Grand Total:</td>
                <td className="border px-4 py-2"><input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={calculateTotal()} readOnly /></td>
              </tr>
              {/* Payment Information */}
              <tr>
                <td colSpan="2">
                  <label htmlFor="amountPaid" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Amount Paid (Rs)</label>
                  <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amountPaid" name="amountPaid" value={formData.amountPaid} onChange={handlePaymentInputChange} />
                </td>
                <td colSpan="2">
                  <label htmlFor="remainingAmount" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Remaining Amount (Rs)</label>
                  <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="remainingAmount" name="remainingAmount" value={formData.remainingAmount} readOnly />
                </td>
                <td>
                  <label htmlFor="paymentMode" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Payment Mode</label>
                  <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="paymentMode" name="paymentMode" value={formData.paymentMode} onChange={handlePaymentInputChange}>
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                  </select>
                </td>
              </tr>
              {/* Discount */}
              <tr>
                <td colSpan="2">
                  <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Discount (%)</label>
                  <input type="number" min="0" max="100" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discount" name="discount" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="col-span-2 mb-4">
            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddRow}>Add Product</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Submit</button>
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => generatePDF(parseFloat(calculateTotal()), invoiceNo, formData.customerName)}>Print</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Invoice;
