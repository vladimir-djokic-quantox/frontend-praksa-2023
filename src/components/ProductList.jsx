import { useState, useEffect } from "react";
import { formatPrice } from "../utils/formatPrice";
import ProductItem from "./ProductItem"; 
import { addCartItem } from "../utils/cartStore";


export default function ProductList() {
  const [products, setProducts] = useState([]);

  const onAddToCart = (id, name, price, thumbnail) => {
    addCartItem({ id, name, price, thumbnail });
  };

  const fetchRandomProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=20");
    const data = await res.json();
    if (data?.products?.length) {
      const shuffledProducts = data.products.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
    }
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  return (
    <div className="w-[90%] mx-auto flex justify-center">
      {products.length && (
        <ol className="flex flex-wrap gap-3 justify-center">
          {products.slice().map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              formatPrice={formatPrice}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
