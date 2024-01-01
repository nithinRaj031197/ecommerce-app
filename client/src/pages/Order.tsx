import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import SelectedProducts from "../components/SelectedProducts";
import CartOrderButton from "../components/CartOrderButton";
import PageHeader from "../components/PageHeader";
import { stripePayment } from "../api/products";
import NavBar from "../components/Navbar";
import { PiShoppingCart, PiSmileySadThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const cart = useSelector((storeState: RootState) => storeState.cart);

  const cartProducts = cart.products;
  const total = cart.total;
  const discountTotal = cart.discountTotal;

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

    stripePayment(lineItems);
  };

  const navigate = useNavigate();

  const emptyCartView = (
    <div className="flex flex-col justify-center items-center  h-screen">
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
  );

  const priceDetailsView = (
    <div className="mb-14 md:pt-[10vh]">
      <div className="px-2 md:hidden">
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

      <CartOrderButton cart={cart} buttonName="Continue" onClick={handlePayment} />
    </div>
  );

  return (
    <>
      <div className=" md:hidden">
        <PageHeader pageHeaderName="Order Summary" />
      </div>
      <div className="hidden md:flex">
        <NavBar />
      </div>

      <div className="mb-14 md:pt-[10vh]">
        {cart.products.length === 0 ? (
          emptyCartView
        ) : (
          <>
            <SelectedProducts />
            {priceDetailsView}
            <CartOrderButton cart={cart} buttonName="Continue" onClick={handlePayment} />
          </>
        )}
      </div>
    </>
  );
};

export default Order;
