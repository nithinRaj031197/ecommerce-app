import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import SelectedProducts from "../components/SelectedProducts";
import CartOrderButton from "../components/CartOrderButton";
import PageHeader from "../components/PageHeader";
import { stripePayment } from "../api/products";

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

  return (
    <div className="mb-14">
      <PageHeader pageHeaderName="Order Summary" />

      <SelectedProducts />
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

      <CartOrderButton cart={cart} buttonName="Continue" onClick={handlePayment} />
    </div>
  );
};

export default Order;
