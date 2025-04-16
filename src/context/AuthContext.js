import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); 

  // Configure axios defaults
  axios.defaults.baseURL = process.env.VITE_API_URL || 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth check failed:', err.response?.data?.message || err.message);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const checkAdminAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const { data } = await axios.get('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(data.user); // or data.admin
        setIsAuthenticated(true);
        setIsAdmin(true);
      } catch (err) {
        console.error("Admin auth failed:", err.response?.data?.message || err.message);
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
  
    // First check admin, fallback to user auth
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      checkAdminAuth();
    } else {
      checkAuth();
    }
    

    
  }, []);


  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });
  
      setUser(data.user); // or data.admin depending on your backend
      setIsAuthenticated(true);
      setIsAdmin(true); // ✅
  
      localStorage.setItem("adminToken", data.admintoken);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      return { success: true };
    } catch (err) {
      console.error("Admin login failed:", err.response?.data?.message || err.message);
      return {
        success: false,
        error: err.response?.data?.message || "Invalid credentials or unauthorized access",
      };
    }
  };
  

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      // console.log('Login successful:', data);
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axios.post('/api/auth/register', userData);
      return { success: true, message: data.message };
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token"); // ✅ Clear token from localStorage
      if(isAdmin){
        localStorage.removeItem("adminToken"); // Clear admin token if logged in as admin
        setIsAdmin(false); // Reset admin state;
        localStorage.removeItem("user"); // Clear user data 
      }
      return { success: true };
    } catch (err) {
      console.error('Logout failed:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Logout failed' 
      };
    }
  };
  

  const value = {
    user,
    isAuthenticated,
    loading,
    isAdmin,
    login,
    register,
    adminLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
