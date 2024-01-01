import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { Product } from "../types/global";
import { addCart } from "../redux/cartSlice";
import SearchProduct from "../components/SearchProduct";
import Image from "../components/Image";
import StarRating from "../components/StarRating";
import NavBar from "../components/Navbar";

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
      <div className="p-5 md:hidden">
        <SearchProduct />
      </div>
      <div className="hidden md:flex">
        <NavBar />
      </div>

      <div className="p-3 pt-0  mb-14 md:pt-[10vh] md:flex ">
        <div className="md:flex-1 md:flex md:items-center md:flex-col">
          <Image
            className="h-72 md:h-96 w-auto md:w-11/12 shadow-slate-500 shadow-sm rounded-lg mt-3"
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
        </div>

        <div className="md:flex-1 md:p-3">
          <p className="font-bold text-xl md:text-3xl">{product?.title}</p>
          <div className="flex items-center justify-between py-2">
            <i className="font-bold text-sm md:text-lg"> Brand: {product?.brand}</i>
            <StarRating rating={product?.rating} />
          </div>
          <div className="py-2">
            <div className="flex gap-3 items-center md:flex-row-reverse md:justify-end">
              <p className="text-2xl md:text-green-600 md:text-xl">{product?.discountPercentage}% off</p>
              <p className="line-through text-slate-400 md:text-2xl  ">${product?.price}</p>
              <p className="font-bold md:text-4xl">
                ${calculateDiscountPrice(productPrice || 0, productDiscountPercentage || 0)}
              </p>
            </div>
          </div>

          <div className="">
            {product?.description}
            <br />
            <i className="text-sm border p-1 rounded-md ">Products Remaining: {product?.stock}</i>
          </div>
        </div>
      </div>

      <div className="fixed bottom-14 md:bottom-0 h-14 w-full flex font-bold ">
        <button
          className="bg-white text-center flex-1 dark:text-black"
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
