import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import BottomNavBar from "./components/BottomNavBar";

import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { fetchAllProducts } from "./redux/productsSlice";
import Settings from "./components/Settings";

const Home = lazy(() => import("./pages/Home"));
const IndividualProduct = React.lazy(() => import("./pages/IndividualProduct"));
const Cart = lazy(() => import("./pages/Cart"));
const Order = lazy(() => import("./pages/Order"));
const Success = lazy(() => import("./components/Success"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<IndividualProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Suspense>
        {isSettings && <Settings />}
      </section>

      <BottomNavBar />
    </main>
  );
};

export default App;
