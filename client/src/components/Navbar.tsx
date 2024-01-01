import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleTheme } from "../redux/themeSlice";
import { FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import SearchProduct from "./SearchProduct";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((storeState: RootState) => storeState.cart);
  const cartSize = cart.products.length;

  const navigate = useNavigate();
  return (
    <nav
      className={`fixed w-full bg-sky-800 dark:bg-slate-800 h-14 md:h-[10vh] flex flex-row justify-between   items-center p-4 text-white`}
    >
      <div
        className="font-bold text-lg md:text-3xl cursor-pointer select-none"
        onClick={() => {
          navigate("/");
        }}
      >
        LOGO
      </div>

      <SearchProduct />

      <div className="hidden md:flex gap-5 items-center">
        <div
          className="text-2xl flex gap-2 hover:bg-sky-700 hover:dark:bg-slate-600 p-2 rounded-2xl cursor-pointer"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {isDarkMode ? <CiLight /> : <MdOutlineDarkMode />}
        </div>
        <div
          className="text-2xl h-full relative flex items-center cursor-pointer"
          onClick={() => {
            navigate("/cart");
          }}
        >
          {cartSize > 0 && (
            <div className="absolute bg-red-500 w-4 h-4 rounded-full top-[-8px] right-[-5px] text-center text-xs">
              {cartSize}
            </div>
          )}

          <FaShoppingCart />
        </div>
        <div className="text-3xl cursor-pointer">
          <RxAvatar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
