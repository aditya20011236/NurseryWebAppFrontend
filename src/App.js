import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./Header";
import AddProduct from "./AddProduct";
import Invoice from "./Invoice";
import Employeeexpence from "./Employeeexpence";
import DemoTable from "./RawMaterialExpence";
import ExW from "./Pages/ExW";
import SD from "./Pages/SD";
import SW from "./Pages/SW";
import SQ from "./Pages/SQ";
import SY from "./Pages/SY";
import ExD from "./Pages/ExD";
import ExM from "./Pages/ExM";
import ExQ from "./Pages/ExQ";
import ExY from "./Pages/ExY";
import SM from "./Pages/SLM";
import PLD from "./Pages/PLD";
import PLW from "./Pages/PLW";
import PLM from "./Pages/PLM";
import PLQ from "./Pages/PLQ";
import PL_Yearly from "./ProfitLoss/ProfitY";
import PLY from "./Pages/PLY";
import AddExpense from "./RawMaterialExpence";
import AdvanceBooking from "./AdvanceBooking/AdvanceBooking";
import ShowBooking from "./AdvanceBooking/ViewBooking";
import EditProduct from "./Updateproduct";
import UserForm from "./RegistrationLogin/register";
import Home from "./RegistrationLogin/Home";
import Login from "./RegistrationLogin/login";
import AdminRegForm from "./RegistrationLogin/register";
import EmployeeRegForm from "./RegistrationLogin/EmployeeRegister";
import EmpLogin from "./RegistrationLogin/Employeelogin";
import EmpInvoice from "./empinvoice";
import AvailableProduct from "./AvalableProduct";

function HeaderRouter() {
  const location = useLocation();
  const hideHeader = ['/admin-login', '/register', '/emp_register', '/employee-login'].includes(location.pathname);

  return !hideHeader && <Header />;
}

function App() {
  return (
    <>
      <Router>
        <HeaderRouter />

        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/home" element={<AvailableProduct />} />
          <Route path="/addexpance" element={<Employeeexpence />} />
          <Route path="/rawmexpence" element={<AddExpense />} />
          <Route path="/SD" element={<SD />} />
          <Route path="/SW" element={<SW />} />
          <Route path="/SM" element={<SM />} />
          <Route path="/SQ" element={<SQ />} />
          <Route path="/SY" element={<SY />} />
          <Route path="/ExD" element={<ExD />} />
          <Route path="/ExW" element={<ExW />} />
          <Route path="/ExM" element={<ExM />} />
          <Route path="/ExQ" element={<ExQ />} />
          <Route path="/ExY" element={<ExY />} />
          <Route path="/PLD" element={<PLD />} />
          <Route path="/PLW" element={<PLW />} />
          <Route path="/PLM" element={<PLM />} />
          <Route path="/PLQ" element={<PLQ />} />
          <Route path="/PLY" element={<PLY />} />
          <Route path="/advancebook" element={<AdvanceBooking />} />
          <Route path="/showbooking" element={<ShowBooking />} />
          <Route path="/updateproduct/:id" element={<EditProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/register" element={<AdminRegForm />} />
          <Route path="/emp_register" element={<EmployeeRegForm />} />
          <Route path="/employee-login" element={<EmpLogin />} />
          <Route path="/empinvoice" element={<EmpInvoice />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
