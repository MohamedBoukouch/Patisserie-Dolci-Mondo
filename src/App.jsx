import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import i18n from "i18next";

// STORE
import StoreLayout from "./views/layouts/StoreLayout";
import Home from "./views/store/Home";
import Contact from "./views/store/Contact";
import AllProducts from "./views/store/AllProducts";

// ADMIN
import AdminLayout from "./views/layouts/AdminLayout";
import AdminHome from "./views/admin/Home";
import Orders from "./views/admin/Orders";
import AllProduct from "./views/admin/products/AllProducts";
import AddProduct from "./views/admin/products/AddProduit";
import Collections from "./views/admin/products/Collections";

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

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="orders" element={<Orders />} />

        {/* PRODUCTS GROUP */}
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
