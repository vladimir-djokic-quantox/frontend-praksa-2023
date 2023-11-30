import React, { useEffect, useState } from "react";

const UserInformation = () => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo) {
        fetch(`https://dummyjson.com/users/${userInfo.id}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          })
          .catch((error) => {
            console.error("Error fetching user information:", error);
          });
      }
    }
  }, [isLoggedIn]);

  if (userData) {
    return (
      <div className="w-[60%] mx-auto mt-8 p-4 border rounded-lg shadow-lg flex">
        <div className="flex-shrink-0">
          <img
            className="w-40 h-40 rounded-full"
            src={userData.image}
            alt="User Avatar"
          />
        </div>

        <div className="ml-4">

          <div className="grid grid-cols-4 gap-5">
            <div>
              <p className="text-sm font-semibold">Name:</p>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Username:</p>
              <p>{userData.username}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Email:</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Phone:</p>
              <p>{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Password:</p>
              <p>{userData.password}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Birth Date:</p>
              <p>{userData.birthDate}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Gender:</p>
              <p>{userData.gender}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Age:</p>
              <p>{userData.age}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Weight:</p>
              <p>{userData.weight}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Height:</p>
              <p>{userData.height}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Eye Color:</p>
              <p>{userData.eyeColor}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Hair Color:</p>
              <p>{userData.hair.color}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Hair Type:</p>
              <p>{userData.hair.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Domain:</p>
              <p>{userData.domain}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">University:</p>
              <p>{userData.university}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Company Department:</p>
              <p>{userData.company.department}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Company Name:</p>
              <p>{userData.company.name}</p>
            </div>
            <div >
              <p className="text-sm font-semibold">Company Title:</p>
              <p>{userData.company.title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading user information...</p>;
  }
};

export default UserInformation;
