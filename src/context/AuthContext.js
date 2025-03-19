import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("🔍 Retrieved user from localStorage:", storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch updated user details from API
  const fetchUserDetails = async (userID) => {
    console.log(`📡 Fetching user details for userID: ${userID}`);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://172.16.4.27:4000/user/view/${userID}`);
      const data = await response.json();

      console.log("✅ API Response:", data);

      if (response.ok && data.statuscode === 200) {
        console.log("✅ User details fetched successfully:", data.data);
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      } else {
        console.error("❌ API returned an error:", data.message);
        setError(data.message || "Error fetching user details");
      }
    } catch (err) {
      console.error("❌ Network error fetching user details:", err);
      setError("Failed to fetch user details. Please check your connection.");
    } finally {
      setLoading(false);
      console.log("🔄 Fetching user details completed");
    }
  };

  // Run only if user exists in localStorage and has a userID
  useEffect(() => {
    if (user?.userID) {
      console.log("⏳ User found in localStorage, verifying details...");
      fetchUserDetails(user.userID);
    } else {
      console.warn("⚠️ No valid user found in localStorage");
    }
  }, []);

  const login = (userData) => {
    console.log("🔑 Logging in user:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("🚪 Logging out user...");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
