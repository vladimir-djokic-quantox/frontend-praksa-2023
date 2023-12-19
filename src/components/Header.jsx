import React from 'react';
import DateTime from './DateTime';

const Header = () => {
  return (
    <div className="bg-[#29b5e1] p-2 text-white w-[80%] mx-auto rounded-[100px] mt-3">
      <div className="container mx-auto flex items-center justify-between pr-5 pl-5">
        <h1 className="text-3xl font-extrabold">Weather Forecast App</h1>
        <DateTime/>
      </div>
    </div>
  );
};

export default Header;
