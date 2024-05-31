import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({ children }) => {

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const login = (userData) => {
    setUserProfile(userData);
    localStorage.setItem('userProfile', JSON.stringify(userData));
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem('userProfile');
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};