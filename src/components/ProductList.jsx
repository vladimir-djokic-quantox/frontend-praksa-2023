import { useState, useEffect } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchRandomProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=20");
    const data = await res.json();
    if (data.products && data.products.length) {
      const shuffledProducts = data.products.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  
  return (
    <div className="w-[90%] mx-auto flex justify-center">
      {products.length && (
          <ol className="flex flex-wrap gap-3 justify-center">
          {products.slice().map((product) => (
            <a href={`/${product.id}`}>
            <li key={product.id} className="bg-white p-4 rounded-lg shadow-md w-[300px]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-auto"
              />
              <h4 className="text-xl font-semibold mt-2">{product.title}</h4>
              <div className="brand">
                <span className="text-orange fw-5">Brand:</span>
                <span className="mx-1">{product?.brand}</span>
              </div>
              <div className="vert-line"></div>
              <div className="brand">
                <span className="text-orange fw-5">Category:</span>
                <span className="mx-1 text-capitalize">
                  {product?.category ? product.category.replace("-", " ") : ""}
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
                </div>
              </div>
            </li>
            </a>
          ))}
        </ol>
      )}

      
      
    </div>
  );
}
