import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatTimeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = currentDateTime.toLocaleDateString("en-US", formatDateOptions);
  const formattedTime = currentDateTime.toLocaleTimeString("en-US", formatTimeOptions);

  return (
    <div className="flex flex-row items-center gap-4">
      <img className="w-5" src="/src/images/calendar.png" alt="" />
      <p className="text-white">{formattedDate}</p>
      <p className="text-white">{formattedTime}</p>
    </div>
  );
};

export default DateTime;
