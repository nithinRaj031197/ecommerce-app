import { IoHomeOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

const BottomNavBar = () => {
  return (
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
  );
};

export default BottomNavBar;
