import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { categoriesApiUrl } from "../utils/apiConstants"

const Sidebar = ({ open = false, setOpen, onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(categoriesApiUrl);
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  return (
    <Transition show={open}>
    <Transition.Child
      className="fixed left-[-350px] top-0 w-[350px] z-30 h-screen"
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-x-0"
      enterTo="translate-x-full"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-full"
      leaveTo="translate-x-0"
    >
      <div
        id="sidebar"
        className={`fixed left-0 top-0 w-[350px] h-screen bg-white pt-20 p-8 z-50`}
      >
        <h1 className="text-black font-bold text-xl">All Categories:</h1>
        <button onClick={() => setOpen(false)} aria-expanded={open} aria-controls="sidebar">
          <span className="text-5xl cursor-pointer text-black absolute top-0 right-3 hover:text-blue-700">×</span>
        </button>
        <ul className="flex flex-col space-y-3">
          {loading ? (
            <li>Loading...</li>
          ) : (
            categories.map((category) => (
              <li
                key={category}
                className="cursor-pointer text-black transition-transform transform hover:translate-x-2 hover:text-blue-700 "
              >
                <a href={`/products/category/${category}`}>
                  <div
                    className={`border-b ${selectedCategory === category ? "text-blue-700" : ""}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </Transition.Child>
    <Transition.Child
      enter="transition-opacity ease-linear duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div onClick={() => setOpen(false)} className="w-full h-full fixed bg-black opacity-80 z-10 inset-0"></div>
    </Transition.Child>
  </Transition>
  );
};

export default Sidebar;
