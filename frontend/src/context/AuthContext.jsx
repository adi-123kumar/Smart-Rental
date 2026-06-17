import { createContext, useState, useEffect } from "react";
import API from "../services/api.js";
import { trackEvent } from "../utils/track";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // 🔥 Load user on refresh
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      fetchProfile();
    }
  }, []);

  // 🔥 Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ❤️ FAVORITE TOGGLE
  const toggleFavorite = (property) => {
    const exists = favorites.find((item) => item._id === property._id);

    if (exists) {
      setFavorites(favorites.filter((item) => item._id !== property._id));

      trackEvent({
        type: "unfavorite",
        propertyId: property._id,
      });
    } else {
      setFavorites([...favorites, property]);

      trackEvent({
        type: "favorite",
        propertyId: property._id,
      });
    }
  };

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "token",
        data.token
      );

      await fetchProfile();

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      return data;
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("BACKEND RESPONSE:", error.response?.data);

      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // ❌ Don't remove interactions (important for ML)

    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };
  const fetchProfile = async () => {
    try {
      const { data } = await API.get(
        "/users/profile"
      );

      setUser(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        favorites,
        toggleFavorite,
        updateUser,
        fetchProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};