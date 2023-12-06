import React, { useEffect, useState } from "react";
import { userApiUrl } from "../utils/apiConstants"

const UserInformation = () => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  const UserDetail = ({ label, value }) => (
    <div>
      <p className="text-sm font-semibold">{label}:</p>
      <p>{value}</p>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(userApiUrl(userId));
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (isLoggedIn && userId) {
      fetchData();
    }
  }, [isLoggedIn, userId]);

  if (userData) {
    return (
      <div className="w-[60%] mx-auto mt-8 p-4 border rounded-lg shadow-lg flex">
      <div className="flex-shrink-0">
        <img className="w-40 h-40 rounded-full" src={userData.image} alt="User Avatar" />
      </div>
    
      <div className="ml-4">
        <div className="grid grid-cols-4 gap-5">
          <UserDetail label="Name" value={`${userData.firstName} ${userData.lastName}`} />
          <UserDetail label="Username" value={userData.username} />
          <UserDetail label="Email" value={userData.email} />
          <UserDetail label="Phone" value={userData.phone} />
          <UserDetail label="Password" value={userData.password} />
          <UserDetail label="Birth Date" value={userData.birthDate} />
          <UserDetail label="Gender" value={userData.gender} />
          <UserDetail label="Age" value={userData.age} />
          <UserDetail label="Weight" value={userData.weight} />
          <UserDetail label="Height" value={userData.height} />
          <UserDetail label="Eye Color" value={userData.eyeColor} />
          <UserDetail label="Hair Color" value={userData.hair.color} />
          <UserDetail label="Hair Type" value={userData.hair.type} />
          <UserDetail label="Domain" value={userData.domain} />
          <UserDetail label="University" value={userData.university} />
          <UserDetail label="Company Department" value={userData.company.department} />
          <UserDetail label="Company Name" value={userData.company.name} />
          <UserDetail label="Company Title" value={userData.company.title} />
        </div>
      </div>
    </div>
    );
  } else {
    return <p>Loading user information...</p>;
  }
};

export default UserInformation;
