import { useEffect, useState } from "react";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
      <h2>Search Results</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <ul className="flex gap-3">
          {searchResults.map((product) => (
             <a href={`/SingleProduct/${product.id}`} key={product.id}>
             <li className="bg-white p-4 rounded-lg shadow-md w-[300px]">
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
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
