import { useNavigate } from "react-router-dom";
import { Product } from "../types/global";
import Image from "./Image";
import StarRating from "./StarRating";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-slate-500 shadow-sm  border h-72 w-72 rounded-md cursor-pointer "
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <Image className="h-52 w-72 rounded-md" src={product.thumbnail} alt={product.title} />
      <p className="text-center p-1">{product.title}</p>
      <div className="flex flex-row-reverse justify-between px-3">
        <StarRating rating={product?.rating} />
        <p className="font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
