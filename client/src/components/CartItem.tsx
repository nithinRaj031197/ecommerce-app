import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/global";
import { BiUpArrow } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";
import { CartProduct, updateQuantity } from "../redux/cartSlice";
import { FaStar } from "react-icons/fa";

type CartItemProps = {
  cartProduct: CartProduct;
};

const CartItem = ({ cartProduct }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [product, setproduct] = useState<Product | undefined>();
  const products = useSelector((storeState: RootState) => storeState.products.products);

  async function getIndividualProduct() {
    const currentProduct = products.find((product) => product.id === Number(cartProduct.productId));
    setproduct(currentProduct);
  }

  useEffect(() => {
    getIndividualProduct();
  }, []);

  const calculateDiscountPrice = useMemo(() => {
    return (price: number = 0, percentage: number = 0): number => {
      const updatedPrice = price - price * (percentage / 100);

      return +updatedPrice.toFixed(2);
    };
  }, []);
  return (
    <div className="p-3 mb-14 flex gap-3">
      <div className="flex flex-col gap-3">
        <img className="h-16 w-16" src={product?.thumbnail} alt={product?.title} />
        <div className="flex flex-col items-center ">
          <BiUpArrow
            className="text-xl"
            onClick={() => {
              if (product && cartProduct.quantity < 5) {
                dispatch(updateQuantity({ productId: product?.id, quantityType: "increment" }));
              }
            }}
          />
          {cartProduct.quantity}
          <BiDownArrow
            className="text-xl"
            onClick={() => {
              if (product && cartProduct.quantity > 1) {
                dispatch(updateQuantity({ productId: product?.id, quantityType: "decrement" }));
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <p>{product?.title}</p>
        <p className="text-xs">{product?.brand}</p>
        <div className="flex  ">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            return <FaStar key={index} color={starIndex <= Math.floor(product?.rating || 0) ? "#ffc107" : "e4e5e9"} />;
          })}
        </div>

        <div className="py-2">
          <div className="flex gap-3 items-center">
            <p className="text-md">{product?.discountPercentage}%</p>
            <p className="line-through text-slate-400  text-md ">${product?.price}</p>
            <p className="font-bold text-lg">
              ${calculateDiscountPrice(cartProduct?.price || 0, product?.discountPercentage || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
