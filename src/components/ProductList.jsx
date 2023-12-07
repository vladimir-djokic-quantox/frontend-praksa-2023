import { useState, useEffect } from "react";
import { addCartItem } from "../utils/cartStore";
import { formatPrice } from "../utils/formatPrice";
import ProductCard from "./ProductCard";
import { productsApiUrl } from "../utils/apiConstants";

export default function ProductList({
  showRandomSubset,
  numberOfProductsToShow,
  serverData,
}) {
  const [products, setProducts] = useState(serverData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const fetchProducts = async (limit) => {
    try {
      const res = await fetch(`${productsApiUrl}?limit=${limit}`);
      const data = await res.json();
      if (data?.products?.length) {
        const shuffledProducts = showRandomSubset
          ? data.products.sort(() => Math.random() - 0.5)
          : data.products;

        const slicedProducts = numberOfProductsToShow
          ? shuffledProducts.slice(0, numberOfProductsToShow)
          : shuffledProducts;

        setProducts(slicedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!serverData) {
      const limit = numberOfProductsToShow || productsPerPage;
      fetchProducts(limit);
    }
  }, [showRandomSubset, numberOfProductsToShow]);

  const nextPage = () => {
    if (!showRandomSubset && currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!showRandomSubset && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onAddToCart = (id, name, price, thumbnail) => {
    addCartItem({ id, name, price, thumbnail });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="w-[90%] mx-auto flex justify-center">
      {currentProducts.length > 0 && (
        <div>
          <ol className="flex flex-wrap gap-3 justify-center">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                formatPrice={formatPrice}
              />
            ))}
          </ol>
          {showRandomSubset ? null : (
            <div className="flex justify-center items-center mt-4 font-bold gap-5">
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
              {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, number) => (
                <button
                  key={number + 1}
                  onClick={() => setCurrentPage(number + 1)}
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
                disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                className={`px-4 py-2 rounded-lg bg-green-500 text-white ${
                  currentPage === Math.ceil(products.length / productsPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

