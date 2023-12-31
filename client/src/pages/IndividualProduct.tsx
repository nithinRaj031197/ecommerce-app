import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { Product } from "../types/global";
import { addCart } from "../redux/cartSlice";
import SearchProduct from "../components/SearchProduct";
import Image from "../components/Image";
import StarRating from "../components/StarRating";

const IndividualProduct = () => {
  const [product, setproduct] = useState<Product | undefined>();

  const dispatch = useDispatch<AppDispatch>();

  const { productId } = useParams();

  const products = useSelector((storeState: RootState) => storeState.products.products);

  async function getIndividualProduct() {
    const currentProduct = products.find((product) => product.id === Number(productId));
    setproduct(currentProduct);
  }

  useEffect(() => {
    getIndividualProduct();
  }, []);

  const calculateDiscountPrice = (price: number = 0, percentage: number = 0): number => {
    const updatedPrice = price - price * (percentage / 100);

    return +updatedPrice.toFixed(2);
  };

  const productPrice = product?.price;
  const productDiscountPercentage = product?.discountPercentage;

  const navigate = useNavigate();

  const cartProducts = useSelector((storeState: RootState) => storeState.cart.products);

  const existingProduct = cartProducts.find((cp) => cp.productId === product?.id);
  const isDisabled = !!existingProduct;

  return (
    <>
      <div className="p-3 mb-14">
        <SearchProduct />

        <Image
          className="h-72 w-auto shadow-slate-500 shadow-sm rounded-lg mt-3"
          src={product?.thumbnail}
          alt={product?.title}
        />

        <div className="flex gap-2 justify-center py-2">
          {product?.images?.map((image, index) => {
            return (
              <div key={index} className="h-20 w-20">
                <Image
                  src={image}
                  alt={image}
                  className="h-20 object-fill w-20 shadow-slate-500 shadow-sm rounded-sm"
                />
              </div>
            );
          })}
        </div>

        <div>
          <p className="font-bold text-xl">{product?.title}</p>
          <div className="flex items-center justify-between py-2">
            <i className="font-bold text-sm"> Brand: {product?.brand}</i>
            <StarRating rating={product?.rating} />
          </div>
          <div className="py-2">
            <div className="flex gap-3 items-center">
              <p className="text-2xl">{product?.discountPercentage}% off</p>
              <p className="line-through text-slate-400   ">${product?.price}</p>
              <p className="font-bold">${calculateDiscountPrice(productPrice || 0, productDiscountPercentage || 0)}</p>
            </div>
          </div>

          <div>
            {product?.description}
            <br />
            <i className="text-sm border p-1 rounded-md ">Products Remaining: {product?.stock}</i>
          </div>
        </div>
      </div>

      <div className="fixed bottom-14 h-14 w-full flex ">
        <button
          className="bg-white text-center flex-1"
          onClick={() => {
            if (product) {
              if (!isDisabled) {
                dispatch(
                  addCart({
                    name: product.title,
                    productId: product.id,
                    price: product.price,
                    discountPrice: calculateDiscountPrice(productPrice || 0, productDiscountPercentage || 0),
                  })
                );
              } else {
                navigate("/cart");
              }
            }
          }}
        >
          {isDisabled ? "Go To Cart" : "Add to Cart"}
        </button>
        <button
          className="bg-orange-500 text-black flex-1"
          onClick={() => {
            if (product) {
              dispatch(
                addCart({
                  name: product.title,
                  productId: product.id,
                  price: product.price,
                  discountPrice: calculateDiscountPrice(productPrice || 0, productDiscountPercentage || 0),
                })
              );
              navigate("/order");
            }
          }}
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default IndividualProduct;
