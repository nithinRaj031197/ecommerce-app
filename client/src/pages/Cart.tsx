import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";

const Cart = () => {
  const cart = useSelector((storeStore: RootState) => storeStore.cart);
  const cartProducts = cart.products;

  const navigate = useNavigate();
  return (
    <div className="mb-14">
      <div className="flex font-bold text-2xl gap-3 items-center pt-3">
        <BiLeftArrowAlt
          className="text-3xl"
          onClick={() => {
            navigate(-1);
          }}
        />
        <p>My Cart</p>
      </div>
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
        <button
          className="bg-orange-500 text-black flex-1"
          onClick={() => {
            navigate("/order");
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
