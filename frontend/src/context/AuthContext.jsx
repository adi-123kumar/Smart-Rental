import { createContext, useState, useEffect } from "react";
import API from "../services/api.js"
import { trackEvent } from "../utils/track";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    // Load user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

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

    // Login
    const login = async (formData) => {
        try {
            const res = await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setUser(res.data.user)

        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    // register
    const register = async (formData) => {
        try {
            const res = await API.post("/auth/register", formData);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // LOGOUT
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, register, logout, favorites, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    )

}