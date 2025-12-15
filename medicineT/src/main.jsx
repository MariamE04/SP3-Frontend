import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./index.css";

import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/register.jsx";
import Medicines from "./page/Medicines.jsx";
import AdminMedicine from "./page/AdminMedicines.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
  <AuthProvider>
	<Header />
 
	<Routes>
  	<Route path="/" element={<Home />} />
  	<Route path="/login" element={<Login />} />
  	<Route path="/register" element={<Register />} />
 
  	<Route element={<ProtectedRoute />}>
    	<Route path="/Home" element={<Home />} />
    	<Route path="/medicines" element={<Medicines />} />
    	<Route path="/medicines/:id/edit" element={<EditMedicine />} />
  	</Route>
 
  	<Route element={<ProtectedRoute role="ADMIN" />}>
    	<Route path="/AdminMedicine" element={<AdminMedicine/>} />
  	</Route>
	</Routes>
 
	<Footer />
  </AuthProvider>
</BrowserRouter>

);