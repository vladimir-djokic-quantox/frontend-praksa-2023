import React from 'react';
import DateTimeComponent from './DateTime';

const Header = () => {
  return (
    <div className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Weather Forecast App</h1>
        <DateTimeComponent/>
      </div>
    </div>
  );
};

export default Header;
