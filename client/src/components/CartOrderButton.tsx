import { CartState } from "../redux/cartSlice";

type CartOrderButtonProps = {
  onClick: () => void;
  cart: CartState;
  buttonName: string;
};

const CartOrderButton = ({ onClick, cart, buttonName }: CartOrderButtonProps) => {
  return (
    <div className="fixed bottom-14 h-14 w-full flex ">
      <div className="bg-white text-center flex-1">
        <p className="line-through text-xs text-slate-400">${cart.total.toFixed(2)}</p>
        <p>${cart.discountTotal.toFixed(2)}</p>
      </div>
      <button className="bg-orange-500 text-black flex-1" onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
};

export default CartOrderButton;
