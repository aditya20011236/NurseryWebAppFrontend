import React, { useState } from "react";
import axios from "axios";
import Menu from "./Sidebar";
import host from "./util/config";

function AddExpense() {
  const [materials, setMaterials] = useState([]);
  const [total, setTotal] = useState(0);
  const [expenseType, setExpenseType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const addExpense = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date
    const newMaterial = {
      type: "",
      materialName: "",
      pricePerUnit: 0,
      quantity: 0,
      total: 0,
      date: currentDate, // Set the default date to today's date
    };
    setMaterials([...materials, newMaterial]);
    calculateTotal([...materials, newMaterial]);
  };

  const updateMaterial = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    if (field !== "type") {
      updatedMaterials[index].total =
        parseFloat(updatedMaterials[index].pricePerUnit) *
        parseFloat(updatedMaterials[index].quantity);
    }
    setMaterials(updatedMaterials);
    calculateTotal(updatedMaterials);
  };

  const calculateTotal = (updatedMaterials) => {
    let total = 0;
    updatedMaterials.forEach((material) => {
      total += parseFloat(material.total);
    });
    setTotal(total);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedMaterials = materials.map((material) => ({
        materialName: material.materialName,
        pricePerUnit: material.pricePerUnit,
        quantity: material.quantity,
        total: material.total,
        type: material.type,
        expenseDetails: material.expenseDetails, // Including expenseDetails
      }));

      const formattedDate =
        materials.length > 0
          ? materials[0].date
          : new Date().toISOString().split("T")[0];

      const expenseData = {
        date: formattedDate,
        expenseType: expenseType,
        grandTotal: total.toFixed(2),
        materials: formattedMaterials,
        expenseDetails: materials.map((material) => material.expenseDetails), // Assuming you have an expenseDetails field in your materials
        // You can add more fields here if needed
      };

      const response = await axios.post(host + "/api/expenses", expenseData);
      console.log("Response:", response.data);

      // Show popup after successfully adding the expense
      setShowPopup(true);

      // Reset materials and total after successful submission
      setMaterials([]);
      setTotal(0);
      setExpenseType("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-start items-center bg-gray-100 ">
      <div className="h-screen">
        <Menu />
      </div>
      <div className="container mx-auto mt-0 justify-start px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
            Add Expenses
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="expenseType"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Expense Type
              </label>
              <select
                id="expenseType"
                name="expenseType"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              >
                <option value="">Select Expense Type</option>
                <option value="employee">Employee</option>
                <option value="routine">Routine</option>
                <option value="capital">Capital</option>
                <option value="raw_material">Raw Material</option>
              </select>
            </div>
            {materials.map((material, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-6">
                <div>
                  <label
                    htmlFor={`materialName${index}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`materialName${index}`}
                    name={`materialName${index}`}
                    value={material.materialName}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      updateMaterial(index, "materialName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor={`expenseDetails${index}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Expense Details
                  </label>
                  <input
                    type="text"
                    id={`expenseDetails${index}`}
                    name={`expenseDetails${index}`}
                    value={material.expenseDetails}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      updateMaterial(index, "expenseDetails", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor={`date${index}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id={`date${index}`}
                    name={`date${index}`}
                    value={material.date || ""} // No default value, allowing user input
                    max={new Date().toISOString().split("T")[0]} // Prevent future dates
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      updateMaterial(index, "date", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor={`pricePerUnit${index}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Price Per Unit
                  </label>
                  <input
                    type="number"
                    id={`pricePerUnit${index}`}
                    name={`pricePerUnit${index}`}
                    value={material.pricePerUnit}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      updateMaterial(index, "pricePerUnit", e.target.value)
                    }
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
                    id={`quantity${index}`}
                    name={`quantity${index}`}
                    value={material.quantity}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      updateMaterial(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor={`total${index}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Total
                  </label>
                  <input
                    type="text"
                    id={`total${index}`}
                    name={`total${index}`}
                    value={material.total}
                    readOnly
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            ))}
            <div className="mb-6">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={addExpense}
              >
                Add Expense
              </button>
            </div>
            <div className="flex justify-end mb-6">
              <table className="table-auto">
                <tfoot>
                  <tr>
                    <td className="text-right font-bold pr-4">Grand Total:</td>
                    <td className="border px-4 py-2">{total.toFixed(2)}</td>
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
      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Expense Added Successfully!
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExpense;
