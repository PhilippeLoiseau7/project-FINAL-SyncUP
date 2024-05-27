import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const login = (userData) => {
    setUserProfile(userData);
  };

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};