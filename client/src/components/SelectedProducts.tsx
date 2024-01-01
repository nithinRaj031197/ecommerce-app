import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "./CartItem";

const SelectedProducts = () => {
  const cart = useSelector((storeState: RootState) => storeState.cart);

  const cartProducts = cart.products;
  const total = cart.total;
  const discountTotal = cart.discountTotal;
  return (
    <div className="md:flex md:px-32 md:gap-10 md:mt-5">
      <div className="md:flex-[2] md:shadow-md md:shadow-slate-400 rounded-md md:p-3">
        {cartProducts?.map((cart) => {
          return <CartItem key={cart.productId} cartProduct={cart} />;
        })}
      </div>

      <div className="hidden md:flex md:flex-[1] md:shadow-md md:shadow-slate-400 rounded-md md:p-3 md:max-h-[40vh] ">
        <div className="px-2 md:w-full">
          <p className="font-bold text-xl mb-3">Price Details</p>
          <div className="flex justify-between">
            <p>Price ({cartProducts.length} items)</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p className="text-green-600">- ${(total - discountTotal).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p className="text-green-600">{total < 12 ? "$" + 1 : "Free Delivery"}</p>
          </div>

          <div className="flex justify-between font-bold text-lg mt-3">
            <p>Total Amount</p>
            <p>${discountTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProducts;
