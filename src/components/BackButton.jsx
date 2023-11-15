import React from 'react';

const BackToHomeButton = () => {
  return (
    <a
      href="/"
      className="text-green-500 hover:text-green-700 flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Home
    </a>
  );
};

export default BackToHomeButton;
