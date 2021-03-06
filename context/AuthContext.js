import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initial State
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  /***********************************************************************
   * Each action/method is hitting the "NEXT_URL"
   * This is the built in next api, which then hits Strapi's API via API_URL
   * The Strapi response is then used to set or unset JWT via HTTPS cookies
   ************************************************************************/

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      setError(data.message);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  const editUserShipping = async (shippingAddress, user) => {
    const res = await fetch(`${NEXT_URL}/api/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: shippingAddress,
        id: user.id,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/review");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, editUserShipping }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
