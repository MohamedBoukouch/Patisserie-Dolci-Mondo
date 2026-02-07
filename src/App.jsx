import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Contact from "./views/Contact";
import AllProducts from "./views/AllProducts";

import i18n from "i18next";

function App() {
  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allproducts" element={<AllProducts />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
