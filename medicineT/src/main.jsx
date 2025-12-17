// main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Medicines from "./page/Medicines";
import AdminMedicine from "./page/AdminMedicines";
import RegisterMedicine from "./components/RegisterMedicine.jsx";
import "./index.css";
import "./style/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Header />

      <Routes>
        {/* Offentlige routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Beskyttede routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/medicines/new" element={<RegisterMedicine />} />

          {/* <Route path="/medicines/:id/edit" element={<EditMedicineForm />} /> */}
        </Route>
        

        {/* Kun admin */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin-medicine" element={<AdminMedicine />} />
        </Route>
      </Routes>

      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
