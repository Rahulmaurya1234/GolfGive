import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, restore token and fetch fresh profile
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch fresh user profile from backend
      getProfile()
        .then((res) => {
          const userData = res.data?.user || res.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Called after login — backend only returns token
  const loginUser = async (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    // Fetch user profile right after login
    try {
      const res = await getProfile();
      const userData = res.data?.user || res.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      // Profile fetch failed but token is saved
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAdmin, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}