import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar.jsx";
import LoginModal from "./LoginModal.jsx";

library.add(faBars);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
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
    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    closeLoginModal();
  };

  const handleLogout = () => {
    setUserInfo({});
    setIsLoggedIn(false);
    localStorage.removeItem("userInfo");
    localStorage.setItem("isLoggedIn", "false");
  };

  const handleSearchButtonClick = () => {
    window.location.href = `/Search/SearchPage?q=${encodeURIComponent(searchInput)}`;
  };

  const handleSearchInputEnter = (event) => {
  if (event.key === "Enter") {
    window.location.href = `/Search/SearchPage?q=${encodeURIComponent(searchInput)}`;
  }
};

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4  ">
      <div className="container mx-auto flex items-center justify-between border-b-2 border-green-400 pb-3">
        <div className="flex items-center">
          <img className="w-[60px] mr-5" src="logo.png" alt="" />
          <h1 className="text-3xl font-bold">My E-Commerce</h1>
        </div>

        <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <a href="/cart" className="relative group">
            <FaShoppingCart />
          </a>
          )}
          {isLoggedIn && (
            <a href="/UserInfo/AccountPage">View Account</a>
          )}
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
          <a href="/AllProducts/AllProducts" className="">
            See All Products
          </a>
        </div>

        <div className="flex items-center">
          <div className="flex items-center w-[500px] bg-white text-gray-500 rounded-full py-2 px-4">
          <input
              type="text"
              placeholder="Search Products"
              className="bg-transparent flex-grow ml-4 focus:outline-none"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchInputEnter}
            />
            <button
              className="text-gray-400"
              onClick={handleSearchButtonClick}
            >
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
