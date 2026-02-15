import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // =============================
  // LOAD FROM LOCALSTORAGE
  // =============================
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved
      ? JSON.parse(saved)
      : {
          user: null,
          token: null,
        };
  });

  // =============================
  // SAVE TO LOCALSTORAGE
  // =============================
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // =============================
  // LOGIN
  // =============================
  const login = (data) => {
    setAuth({
      user: {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
      token: data.token,
    });
  };

  // =============================
  // LOGOUT
  // =============================
  const logout = () => {
    setAuth({
      user: null,
      token: null,
    });

    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =============================
// CUSTOM HOOK
// =============================
export const useAuth = () => useContext(AuthContext);
