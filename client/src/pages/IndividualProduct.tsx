import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { Product } from "../types/global";
import { FaStar } from "react-icons/fa";

const IndividualProduct = () => {
  const [product, setproduct] = useState<Product | undefined>();

  const { productId } = useParams();

  const products = useSelector((storeState: RootState) => storeState.products.products);

  async function getIndividualProduct() {
    const currentProduct = products.find((product) => product.id === Number(productId));
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
    <>
      <div className="p-3 mb-14">
        <img className="h-72 w-auto" src={product?.thumbnail} alt={product?.title} />

        <div className="flex gap-2 justify-center py-2">
          {product?.images?.map((image, index) => {
            return (
              <div key={index} className="h-20 w-20">
                <img src={image} alt={image} className="h-20 object-fill w-20" />
              </div>
            );
          })}
        </div>

        <div>
          <p>{product?.title}</p>
          <div className="flex items-center justify-between py-2">
            <p> Brand: {product?.brand}</p>
            <div className="flex  ">
              {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                return (
                  <FaStar key={index} color={starIndex <= Math.floor(product?.rating || 0) ? "#ffc107" : "e4e5e9"} />
                );
              })}
            </div>
          </div>
          <div className="py-2">
            <div className="flex gap-3 items-center">
              <p className="text-2xl">{product?.discountPercentage}% off</p>
              <p className="line-through text-slate-400   ">${product?.price}</p>
              <p className="font-bold">
                ${calculateDiscountPrice(product?.price || 0, product?.discountPercentage || 0)}
              </p>
            </div>
          </div>

          <div>
            {product?.description}

            <i className="text-sm">Products Remaining: {product?.stock}</i>
          </div>
        </div>
      </div>

      <div className="fixed bottom-14 h-14 w-full flex ">
        <button className="bg-white text-center flex-1">Add to Cart</button>
        <button className="bg-orange-500 text-black flex-1">Buy Now</button>
      </div>
    </>
  );
};

export default IndividualProduct;
