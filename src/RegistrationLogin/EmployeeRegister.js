import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Loginbg from './Loginbg.jpg';

function EmployeeRegForm() {
    const navigate = useNavigate(); // Use useNavigate hook
    const [employee, setEmployee] = useState({
        fullname: '',
        mobno: '',
        gender: '',
        username: '',
        email: '',
        password: ''
    });
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    // Define handleNavigate outside of handleSubmit
    const handleNavigate = () => {
        navigate('/employee-login');
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:8080/api/employees/register', employee)
        axios.post('http://16.170.242.6:8080/api/employees/register', employee)
            .then(response => {
                console.log('Employee registered successfully:', response.data);
                setRegisterSuccess(true); // Set registerSuccess state to true to display the popup
                // Optionally, you can redirect or perform any other action after successful registration
            })
            .catch(error => {
                console.error('Error registering employee:', error);
                // Handle error, e.g., show an error message to the user
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
   

        <div className="max-w-md mx-auto w-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-center mb-4">Employee Registration</h2>
                {/* Popup for successful registration */}
                {registerSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Registration Successful</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setRegisterSuccess(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 0 1 0 .707l-8.485 8.485a.5.5 0 0 1-.707-.707l8.485-8.485a.5.5 0 0 1 .707 0z" /></svg>
                        </span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                            Full Name
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="Full Name" name="fullname" value={employee.fullname} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobno">
                            Mobile Number
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobno" type="text" placeholder="Mobile Number" name="mobno" value={employee.mobno} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender" name="gender" value={employee.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" name="username" value={employee.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" name="email" value={employee.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" name="password" value={employee.password} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                        <button onClick={handleNavigate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default EmployeeRegForm;
