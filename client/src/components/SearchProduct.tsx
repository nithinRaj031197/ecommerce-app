import { fetchSearchedProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { BaseSyntheticEvent } from "react";

const SearchProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  function debounce<T extends any[]>(fn: (...args: T) => void, delay = 500): (...args: T) => void {
    let timer: any;

    return function (this: any, ...args: T) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const handleInputValue = (e: BaseSyntheticEvent) => {
    const value = e.target.value;

    dispatch(fetchSearchedProducts(value));
  };

  const searchProducts = debounce(handleInputValue, 500);

  return (
    <div className="flex items-center flex-grow md:flex-grow-0 shadow-md shadow-slate-500 rounded-lg pl-2">
      <input
        className={`outline-none h-8 md:h-10 md:w-96 w-full rounded-lg p-2 text-black  dark:bg-slate-300 `}
        placeholder="Search..."
        onChange={searchProducts}
        onKeyDown={handleInputValue}
      />
    </div>
  );
};

export default SearchProduct;
