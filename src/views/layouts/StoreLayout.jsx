// src/layouts/StoreLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";

const StoreLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default StoreLayout;
