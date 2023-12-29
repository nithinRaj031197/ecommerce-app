import { IoHomeOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const cartProducts = useSelector((storeState: RootState) => storeState.cart.products);

  const navigate = useNavigate();

  const cartSize = cartProducts?.length;
  return (
    <nav className="md:hidden fixed bottom-0 bg-sky-800 dark:bg-slate-800  w-full h-14 flex text-2xl items-center justify-around text-white">
      <div
        className="flex flex-col items-center py-2"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoHomeOutline />
        <p className="text-xs">Home</p>
      </div>
      <div
        className="flex flex-col items-center py-2 relative"
        onClick={() => {
          navigate("/cart");
        }}
      >
        {cartSize > 0 && (
          <div className="absolute bg-red-500 w-4 h-4 rounded-full top-1 right-[-2px] text-center text-xs">
            {cartSize}
          </div>
        )}
        <PiShoppingCart />
        <p className="text-xs">Cart</p>
      </div>
      <div className="flex flex-col items-center py-2">
        <RxAvatar />
        <p className="text-xs">Profile</p>
      </div>
    </nav>
  );
};

export default BottomNavBar;
