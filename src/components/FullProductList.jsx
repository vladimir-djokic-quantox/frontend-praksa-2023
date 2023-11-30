import { useState, useEffect } from "react";
import { addCartItem } from "../utils/cartStore";
import { formatPrice } from "../utils/formatPrice";
import ProductItem from "./ProductItem";


export default function FullProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data?.products?.length) setProducts(data.products);
  };

    useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onAddToCart = (id, name, price, thumbnail) => {
    addCartItem({ id, name, price, thumbnail });
  };

  return (
    <div className="w-[90%] mx-auto flex justify-center">
      {currentProducts.length > 0 && (
        <div>
             <ol className="flex flex-wrap gap-3 justify-center">
            {currentProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                formatPrice={formatPrice}
              />
            ))}
          </ol>
          <div className="pagination flex justify-center items-center mt-4 font-bold gap-5">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg bg-green-500 text-white ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              Previous
            </button>
            {[
              ...Array(Math.ceil(products.length / productsPerPage)).keys(),
            ].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 rounded-lg bg-green-500 text-white ${
                  currentPage === number + 1
                    ? "bg-green-600"
                    : "hover:bg-green-600"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
              className={`px-4 py-2 rounded-lg bg-green-500 text-white ${
                currentPage === Math.ceil(products.length / productsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
