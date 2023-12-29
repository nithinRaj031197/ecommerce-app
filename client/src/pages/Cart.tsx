import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cart = useSelector((storeStore: RootState) => storeStore.cart);
  const cartProducts = cart.products;

  return (
    <>
      <div>
        {cartProducts?.map((cart) => {
          return <CartItem key={cart.productId} cartProduct={cart} />;
        })}
      </div>
      <div className="fixed bottom-14 h-14 w-full flex ">
        <div className="bg-white text-center flex-1">
          <p className="line-through text-xs text-slate-400">${cart.total.toFixed(2)}</p>
          <p>${cart.discountTotal.toFixed(2)}</p>
        </div>
        <button className="bg-orange-500 text-black flex-1">Place Order</button>
      </div>
    </>
  );
};

export default Cart;
