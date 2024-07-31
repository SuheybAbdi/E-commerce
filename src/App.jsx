import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Corrected path
import Product from "./pages/Product";
import SingleProduct from "./components/SingleProduct"; // Corrected path
import Home from "./pages/Home"; // Corrected path
import About from "./pages/About"; // Corrected path
import NotFound from "./components/NotFound"; // Corrected path
import "bootstrap/dist/css/bootstrap.min.css"; // Corrected import path
import ShoppingCart from "./components/ShoppingCart"; // Corrected path
import { ToastContainer, toast } from "react-toastify"; // Corrected import path
import "react-toastify/dist/ReactToastify.css"; // Corrected import path
import Contact from "./pages/Contact"; // Corrected path
import GoToCheckout from "./pages/GoToChekout";
import GoToTop from "./components/GoToTop"; // Corrected path
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  const AddToCart = (data) => {
    const itemExists = cart.some((item) => item.id === data.id);

    if (itemExists) {
      toast.error("This item is already in your cart.");
      return;
    }

    setCart([...cart, { ...data, quantity: 1 }]);
    toast.success("Item added to cart.");
  };

  const handleRemoveItem = (itemId) => {
    const filteredData = cart.filter((item) => item.id !== itemId);
    if (filteredData.length === cart.length) {
      toast.error("Failed to remove item.");
    } else {
      setCart(filteredData);
      toast.success("Item removed from cart.");
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header count={cart.length} ShoppingCart={<ShoppingCart />} />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/goToCheckout" element={<GoToCheckout />} />
          <Route
            path="/products/:id"
            element={
              <SingleProduct
                AddToCart={AddToCart}
                ToastContainer={ToastContainer}
                toast={toast}
              />
            }
          />
          <Route
            path="/shoppingCart/:id"
            element={
              <ShoppingCart
                cart={cart}
                handleRemoveItem={handleRemoveItem}
                count={cart.length}
                ToastContainer={<ToastContainer />}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GoToTop />
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
