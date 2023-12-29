import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import NavBar from "./components/Navbar";
import BottomNavBar from "./components/BottomNavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import IndividualProduct from "./pages/IndividualProduct";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [isDarkMode]);

  return (
    <main className={isDarkMode ? "dark  h-screen" : ""}>
      <NavBar />

      <section className=" pt-14 pb-14  md:pt-[10vh] ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<IndividualProduct />} />
        </Routes>
      </section>

      <BottomNavBar />
    </main>
  );
};

export default App;
