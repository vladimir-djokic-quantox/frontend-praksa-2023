import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { addCartItem } from "../utils/cartStore";
import { formatPrice } from "../utils/formatPrice";


const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const onAddToCart = (id, name, price, thumbnail) => {
    addCartItem({ id, name, price, thumbnail });
  };

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get("q");

    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await response.json();

        if (Array.isArray(data.products)) {
          setSearchResults(data.products);
        } else {
          console.error("Invalid data structure from the API");
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <ul className="flex gap-3">
          {searchResults.map((product) => (
             <ProductItem
             key={product.id}
             product={product}
             formatPrice={formatPrice}
             onAddToCart={onAddToCart}
           />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
