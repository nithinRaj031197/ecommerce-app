import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import SelectedProducts from "../components/SelectedProducts";
import CartOrderButton from "../components/CartOrderButton";
import PageHeader from "../components/PageHeader";
import { PiShoppingCart } from "react-icons/pi";
import { PiSmileySadThin } from "react-icons/pi";

const Cart = () => {
  const cart = useSelector((storeStore: RootState) => storeStore.cart);

  const navigate = useNavigate();

  if (cart.products.length === 0) {
    return (
      <>
        <PageHeader pageHeaderName="My Cart" />
        <div className="flex flex-col justify-center items-center mt-3">
          <div className="relative ">
            <PiShoppingCart style={{ fontSize: "200px" }} />
            <PiSmileySadThin className="absolute text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%]" />
          </div>
          <br />
          <p className="text-lg font-bold">Your cart is empty</p>
          <button
            className="bg-blue-500 p-2 rounded-md cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Shop Now
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="mb-14">
      <PageHeader pageHeaderName="My Cart" />
      <SelectedProducts />

      <CartOrderButton
        cart={cart}
        buttonName="Place Order"
        onClick={() => {
          navigate("/order");
        }}
      />
    </div>
  );
};

export default Cart;
