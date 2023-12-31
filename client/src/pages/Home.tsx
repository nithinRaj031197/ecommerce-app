import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NavBar from "../components/Navbar";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const products = useSelector((storeState: RootState) => storeState.products.products);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 pt-14  place-items-center gap-5 md:grid-cols-4 p-2">
        {products?.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Home;
