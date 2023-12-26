import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { toggleTheme } from "./redux/themeSlice";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  return (
    <main className={isDarkMode ? "dark bg-black h-screen" : ""}>
      <nav
        className={`${
          isDarkMode ? "bg-slate-800 " : "bg-sky-800 "
        } h-[10vh] flex flex-row justify-between   items-center p-4 text-white`}
      >
        <div className="font-bold text-3xl ">LOGO</div>

        <div className="flex items-center">
          <input
            className={`h-10 w-96 rounded-tl-lg rounded-bl-lg p-2 text-black ${isDarkMode ? "bg-slate-300" : ""} `}
            placeholder="Search..."
          />
          <button
            className={`text-white ${
              isDarkMode ? "bg-orange-900" : "bg-orange-400"
            } h-10 w-12 flex items-center justify-center text-2xl font-bold rounded-tr-lg rounded-br-lg`}
          >
            <IoSearchOutline />
          </button>
        </div>

        <div className="flex gap-5 items-center ">
          <div className="text-2xl flex gap-2 border p-2 rounded-2xl cursor-pointer">
            <CiLight className="cursor-default" />

            <div
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              {isDarkMode ? <FaToggleOn /> : <FaToggleOff />}
            </div>

            <MdOutlineDarkMode className="cursor-default" />
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
    </main>
  );
};

export default App;
