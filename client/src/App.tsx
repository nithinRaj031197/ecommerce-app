import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { toggleTheme } from "./redux/themeSlice";
import { IoHomeOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { useEffect } from "react";
import { fetchAllProducts } from "./redux/productsSlice";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((storeState: RootState) => storeState.products.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <main className={isDarkMode ? "dark bg-black h-screen" : ""}>
      {/* Header Navbar */}
      <nav
        className={`fixed w-full bg-sky-800 dark:bg-slate-800 h-14 md:h-[10vh] flex flex-row justify-between   items-center p-4 text-white`}
      >
        <div className="font-bold text-lg md:text-3xl ">LOGO</div>

        <div className="flex items-center flex-grow md:flex-grow-0  pl-2">
          <input
            className={`h-8 md:h-10 md:w-96 w-full rounded-tl-lg rounded-bl-lg p-2 text-black  dark:bg-slate-300 `}
            placeholder="Search..."
          />
          <button
            className={`text-white bg-orange-400 h-8 md:h-10 w-12 flex items-center justify-center text-2xl font-bold rounded-tr-lg rounded-br-lg`}
          >
            <IoSearchOutline />
          </button>
        </div>

        <div className="hidden md:flex gap-5 items-center">
          <div
            className="text-2xl flex gap-2 hover:bg-sky-700 hover:dark:bg-slate-600 p-2 rounded-2xl cursor-pointer"
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {isDarkMode ? <CiLight /> : <MdOutlineDarkMode />}
          </div>
          <div className="text-2xl h-full relative flex items-center cursor-pointer">
            <div className="absolute bg-red-500 w-4 h-4 rounded-full top-[-5px] text-center text-xs">1</div>
            <FaShoppingCart />
          </div>
          <div className="text-3xl cursor-pointer">
            <RxAvatar />
          </div>
        </div>
      </nav>

      {/* <main>
      </main> */}

      {/* Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 bg-sky-800 dark:bg-slate-800  w-full h-14 flex text-2xl items-center justify-around text-white">
        <div className="flex flex-col items-center py-2">
          <IoHomeOutline />
          <p className="text-xs">Home</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <PiShoppingCart />
          <p className="text-xs">Cart</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <RxAvatar />
          <p className="text-xs">Profile</p>
        </div>
      </nav>
    </main>
  );
};

export default App;
