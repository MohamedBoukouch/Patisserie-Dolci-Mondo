import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Contact from "./views/Contact";
import AllProducts from "./views/AllProducts";

function App() {
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
