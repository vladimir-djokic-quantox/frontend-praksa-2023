import React, { useState, useEffect } from 'react';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString('en-US', options);
  const formattedTime = currentDateTime.toLocaleTimeString('en-US');

  return (
    <div className=" bg-white p-2 rounded-md shadow-md">
      <h1 className="text-gray-700 text-xl font-bold">Current Date and Time</h1>
      <p className="text-gray-700 ">Date: {formattedDate}</p>
      <p className="text-gray-700 ">Time: {formattedTime}</p>
    </div>
  );
};

export default DateTimeComponent;
