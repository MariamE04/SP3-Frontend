import { createContext, useState, useEffect } from "react";
import facade from "../utils/authFacade";

// 1. Opret context
const AuthContext = createContext();

// 2. Opret Provider komponent
function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (loggedIn) {
      const fetchUserFromToken = () => {
        const [user, userRoles] = facade.getUserNameAndRoles();
        if (user) {
          setUsername(user);
        }
        if (userRoles) {
          setRoles(userRoles);
        }
      };
      fetchUserFromToken();
    }
  }, [loggedIn]); 

  const login = async (username, password) => {
    await facade.login(username, password);
    const [user, userRoles] = facade.getUserNameAndRoles();
    setUsername(user);
    setRoles(userRoles);
    setLoggedIn(true);
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
    setRoles("");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Eksporter nederst
export { AuthContext, AuthProvider };
