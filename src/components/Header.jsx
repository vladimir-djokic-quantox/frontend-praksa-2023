import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4  ">
      <div className="container mx-auto flex items-center justify-between border-b-2 border-green-400 pb-5">
        <div className="flex items-center">
          <div className="flex items-center">
            <img className="w-[60px]  mr-5" src="logo.png" alt="" />
            <h1 className="text-3xl font-bold">My E-Commerce</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center w-[500px] bg-white text-gray-500 rounded-full py-2 px-4">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-transparent flex-grow ml-4 focus:outline-none"
            />
            <button className="text-gray-400">
              <FiSearch />
            </button>
          </div>
          <a href="/cart" className="relative group">
            <FaShoppingCart />
          </a>
          <a href="/account" className="">
            View Account
          </a>
          <a href="/login" className="">
            Log In
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-3 flex items-center space-x-4">
        <button
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="sidebar"
          aria-label="Open Menu"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-bars"
            size="2xl"
            style={{ color: "#ffffff" }}
          />
        </button>
        <Sidebar open={open} setOpen={setOpen} />
        <p>All Categories</p>
        <a href="/products" className="">
          See All Products
        </a>
      </div>
    </header>
  );
};

export default Header;
