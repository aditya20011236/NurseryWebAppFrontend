
import Header from "./Header";
import AddProduct from "./AddProduct";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./Home";

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


// import RawMaterialExpence from "./RawMaterialExpence";



function App() {
  return (
    <>
   
      <Router>
        <Header />
      
        <Routes>
          <Route path="/addproduct" element={<AddProduct></AddProduct>}></Route>
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/" element={<Invoice></Invoice>}></Route>
          {/* <Route path="/addexpance" element={<Employeeexpence/>}></Route> */}
          
          <Route path="/rawmexpence" element={<AddExpense/>}></Route>
          <Route path="/SD" element={<SD/>}></Route>
          <Route path="/SW" element={<SW/>}></Route>
          <Route path="/SM" element={<SM/>}></Route>
          <Route path="/SQ" element={<SQ/>}></Route>
          <Route path="/SY" element={<SY/>}></Route>
          <Route path="/ExD" element={<ExD/>}></Route>
          <Route path="/ExW" element={<ExW/>}></Route>
          <Route path="/ExM" element={<ExM/>}></Route>
          <Route path="/ExQ" element={<ExQ/>}></Route>
          <Route path="/ExY" element={<ExY/>}></Route>
          <Route path="/PLD" element={<PLD/>}></Route>
          <Route path="/PLW" element={<PLW/>}></Route>
          <Route path="/PLM" element={<PLM/>}></Route>
          <Route path="/PLQ" element={<PLQ/>}></Route>
          <Route path="/PLY" element={<PLY/>}></Route>
          <Route path="/advancebook" element={<AdvanceBooking/>}></Route>
          <Route path="/showbooking" element={<ShowBooking/>}></Route>
          <Route path="/updateproduct/:id" element={<EditProduct/>}></Route>
        </Routes>
      </Router>
        
        </> 
  );
}

export default App;



