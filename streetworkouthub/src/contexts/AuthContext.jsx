import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const baseUrl = "/api";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = Boolean(auth?.accessToken);

  async function login(email, password) {
    const res = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    setAuth(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  async function register(email, password) {
    const res = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    setAuth(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  async function logout() {
    if (auth?.accessToken) {
      await fetch(`${baseUrl}/users/logout`, {
        headers: { "X-Authorization": auth.accessToken },
      });
    }
    setAuth(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
