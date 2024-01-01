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
import Settings from "./components/Settings";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  const isSettings = useSelector((storeState: RootState) => storeState.modals.isSettings);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [isDarkMode]);

  return (
    <main className={` ${isDarkMode ? "dark  h-screen" : ""}`}>
      <section className="relative pb-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<IndividualProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        {isSettings && <Settings />}
      </section>

      <BottomNavBar />
    </main>
  );
};

export default App;
