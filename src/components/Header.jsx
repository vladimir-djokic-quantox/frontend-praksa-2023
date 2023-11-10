import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal.jsx";

library.add(faBars);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = (userData) => {
    setUserInfo(userData);
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    setUserInfo({});
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4  ">
      <div className="container mx-auto flex items-center justify-between border-b-2 border-green-400 pb-3">
        <div className="flex items-center">
          <img className="w-[60px] mr-5" src="logo.png" alt="" />
          <h1 className="text-3xl font-bold">My E-Commerce</h1>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/cart" className="relative group">
            <FaShoppingCart />
          </a>
          <a href="/account">View Account</a>
          {isLoggedIn ? (
            <>
              <p className="text-white">Welcome, {userInfo.firstName}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={openLoginModal}>Log In</button>
          )}
        </div>
      </div>

      <div className="container mx-auto mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
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

        <div className="flex items-center">
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
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Header;
