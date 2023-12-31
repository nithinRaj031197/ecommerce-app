import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { RootState } from "../redux/store";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const cart = useSelector((storeState: RootState) => storeState.cart);

  const cartProducts = cart.products;
  const total = cart.total;
  const discountTotal = cart.discountTotal;

  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

  const handlePayment = async () => {
    const lineItems = cartProducts.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.discountPrice * 100,
        },
        quantity: item.quantity,
      };
    });

    const response = await axios.post("http://localhost:5001/checkout", { line_items: lineItems });
    const data = response.data;

    const stripe = await stripePromise;

    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

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
        <p>Order Summary</p>
      </div>

      <div>
        {cartProducts?.map((cart) => {
          return <CartItem key={cart.productId} cartProduct={cart} />;
        })}
      </div>

      <div className="px-2 ">
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

      <div className="fixed bottom-14 h-14 w-full flex ">
        <div className="bg-white text-center flex-1">
          <p className="line-through text-xs text-slate-400">${cart.total.toFixed(2)}</p>
          <p>${cart.discountTotal.toFixed(2)}</p>
        </div>
        <button className="bg-orange-500 text-black flex-1" onClick={handlePayment}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Order;
