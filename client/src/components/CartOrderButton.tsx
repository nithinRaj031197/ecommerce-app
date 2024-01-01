import { CartState } from "../redux/cartSlice";

type CartOrderButtonProps = {
  onClick: () => void;
  cart: CartState;
  buttonName: string;
};

const CartOrderButton = ({ onClick, cart, buttonName }: CartOrderButtonProps) => {
  return (
    <div className="fixed bottom-14 md:bottom-0 h-14 w-full flex ">
      <div className="bg-white text-center flex-1 font-bold md:hidden">
        <p className="line-through text-xs text-slate-400">${cart.total.toFixed(2)}</p>
        <p className="dark:text-black">${cart.discountTotal.toFixed(2)}</p>
      </div>
      <button className="bg-orange-500 text-black flex-1" onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
};

export default CartOrderButton;
