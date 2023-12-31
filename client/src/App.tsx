import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import BottomNavBar from "./components/BottomNavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import IndividualProduct from "./pages/IndividualProduct";
import { fetchAllProducts } from "./redux/productsSlice";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Success from "./components/Success";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [isDarkMode]);

  return (
    <main className={isDarkMode ? "dark  h-screen" : ""}>
      <section className=" pb-14  md:pt-[10vh] ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<IndividualProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </section>

      <BottomNavBar />
    </main>
  );
};

export default App;
