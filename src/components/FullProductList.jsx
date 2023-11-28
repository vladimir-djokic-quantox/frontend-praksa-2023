import { useState, useEffect } from "react";
import { addCartItem } from "../pages/cartStore";

export default function FullProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data.products && data.products.length) setProducts(data.products);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
    <div className="w-[90%] mx-auto">
      {currentProducts.length > 0 && (
        <div>
          <ol className="flex flex-wrap gap-3">
            {currentProducts.map((product) => (
              <li className="bg-white p-4 rounded-lg shadow-md w-[300px]">
                <a href={`/SingleProduct/${product.id}`} key={product.id}>
                  <img
                    src={product.thumbnail}
                    className="w-full h-40 object-cover"
                    />
                </a>

                <h4 className="text-xl font-semibold mt-2">{product.title}</h4>
                <div className="brand">
                  <span className="text-orange fw-5">Brand:</span>
                  <span className="mx-1">{product?.brand}</span>
                </div>
                <div className="vert-line"></div>
                <div className="brand">
                  <span className="text-orange fw-5">Category:</span>
                  <span className="mx-1 text-capitalize">
                    {product?.category
                      ? product.category.replace("-", " ")
                      : ""}
                  </span>
                </div>
                <div className="price">
                  <div className="flex align-center">
                    <div className="old-price text-gray">
                      {formatPrice(product?.price)}
                    </div>
                    <span className="fs-14 mx-2 text-dark">
                      Inclusive of all taxes
                    </span>
                    <button
                      onClick={() =>
                        onAddToCart(
                          product.id,
                          product.title,
                          product.price,
                          product.thumbnail
                        )
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
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
