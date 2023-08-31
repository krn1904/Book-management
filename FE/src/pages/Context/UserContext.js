import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  },[]);

  const setUserDetails = (userData) => {
    setUser(userData);
    localStorage.setItem('user',userData)
  };

  const removeUserDetails = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserDetails, removeUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
