import React, { useState, useRef, useEffect } from "react";
import { loginApiUrl } from "../utils/apiConstants";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const modalRef = useRef(null);

  const handleLogin = () => {
    fetch(loginApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          onLogin(data);
        } else {
          alert("Login failed. Check your username and password.");
        }
      })
      .catch((error) => {
        console.error("Error communicating with the server:", error);
      });
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleCloseModal);
    } else {
      document.removeEventListener("mousedown", handleCloseModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      className={`z-10 fixed top-3 right-3 bg-white p-6 rounded-lg w-[350px] shadow-lg transition-all duration-300 ${
        isOpen ? "" : "opacity-0 pointer-events-none"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Log In</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-700"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Log In
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};

export default LoginModal;
