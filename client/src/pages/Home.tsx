import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const products = useSelector((storeState: RootState) => storeState.products.products);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 pt-14  place-items-center gap-5 md:grid-cols-4 p-2">
        {products?.map((product) => {
          return (
            <div
              key={product.id}
              className="shadow-slate-500 shadow-sm  border h-72 w-72 rounded-md cursor-pointer "
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            >
              <img className="h-52 w-72 rounded-md" src={product.thumbnail} alt={product.title} />
              <p className="text-center p-1">{product.title}</p>
              <div className="flex flex-row-reverse justify-between px-3">
                <div className="flex ">
                  {[...Array(5)].map((_, index) => {
                    const starIndex = index + 1;
                    return (
                      <FaStar key={index} color={starIndex <= Math.floor(product.rating) ? "#ffc107" : "e4e5e9"} />
                    );
                  })}
                </div>
                <p className="font-bold">${product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
