import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/global";
import { BiUpArrow } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";
import { CartProduct, updateQuantity } from "../redux/cartSlice";
import { FaStar } from "react-icons/fa";
import Image from "./Image";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div className="p-3 mb-14 md:mb-0 flex gap-3 border-b-2">
      <div className="flex flex-col gap-3 md:items-center">
        <div
          onClick={() => {
            navigate(`/product/${product?.id}`);
          }}
        >
          <Image
            className="h-16 w-16 md:h-32 md:w-24 md:object-fill cursor-pointer"
            src={product?.thumbnail}
            alt={product?.title}
          />
        </div>
        <div className="flex flex-col items-center  md:gap-3 md:flex-row-reverse md:text-xl md:font-bold ">
          <BiUpArrow
            className="text-xl md:rotate-90 cursor-pointer"
            onClick={() => {
              if (product && cartProduct.quantity < 5) {
                dispatch(updateQuantity({ productId: product?.id, quantityType: "increment" }));
              }
            }}
          />
          <p className="select-none">{cartProduct.quantity}</p>
          <BiDownArrow
            className="text-xl md:rotate-90 cursor-pointer"
            onClick={() => {
              if (product && cartProduct.quantity > 1) {
                dispatch(updateQuantity({ productId: product?.id, quantityType: "decrement" }));
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <p className="md:text-2xl md:font-bold">{product?.title}</p>
        <p className="text-xs md:text-lg">{product?.brand}</p>
        <StarRating rating={product?.rating} />

        <div className="py-2">
          <div className="flex gap-3 items-center md:flex-row-reverse md:justify-end">
            <p className="text-2xl md:text-green-600 md:text-xl">{product?.discountPercentage}% off</p>
            <p className="line-through text-slate-400 md:text-xl  ">${product?.price}</p>
            <p className="font-bold md:text-2xl">
              ${calculateDiscountPrice(cartProduct?.price || 0, product?.discountPercentage || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
