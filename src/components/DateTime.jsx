import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDateTime.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-row items-center gap-1">
      <img className="w-5" src="/src/images/calendar.png" alt="" />
      <p className="text-white ">{formattedDate}</p>
    </div>
  );
};

export default DateTime;
