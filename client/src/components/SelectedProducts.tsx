import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "./CartItem";

const SelectedProducts = () => {
  const cart = useSelector((storeState: RootState) => storeState.cart);

  const cartProducts = cart.products;
  return (
    <div>
      {cartProducts?.map((cart) => {
        return <CartItem key={cart.productId} cartProduct={cart} />;
      })}
    </div>
  );
};

export default SelectedProducts;
