import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import i18n from "i18next";

// STORE
import StoreLayout from "./views/layouts/StoreLayout";
import Home from "./views/store/Home";
import Contact from "./views/store/Contact";
import AllProducts from "./views/store/AllProducts";

import ProtectedRoute from "./components/admin/ProtectedRoute";


// ADMIN
import AdminLayout from "./views/layouts/AdminLayout";
import AdminHome from "./views/admin/Home";
import Auth from "./views/admin/Auth";
import Orders from "./views/admin/Orders";
import AllProduct from "./views/admin/products/AllProducts";
import AddProduct from "./views/admin/products/AddProduit";
import Collections from "./views/admin/collections/Collections";
import Team from "./views/admin/Team";

function App() {
  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Routes>
      {/* STORE ROUTES */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allproducts" element={<AllProducts />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin" element={<Auth />} />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<AdminHome />} />
        <Route path="orders" element={<Orders />} />
        <Route path="team" element={<Team />} />

        <Route path="products">
          <Route index element={<AllProduct />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="collections" element={<Collections />} />
        </Route>
      </Route>


    </Routes>
  );
}

export default App;
