import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, isAdmin, logoutUser, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive(path)
        ? 'bg-primary text-white shadow-sm'
        : 'text-gray-600 hover:text-primary hover:bg-indigo-50'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
              <span className="text-white text-lg">⛳</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Golf<span className="text-indigo-600">Give</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={linkClass('/')}>Home</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className={linkClass('/login')}>Login</Link>

                <Link
                  to="/signup"
                  className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 
                  text-white text-sm font-semibold shadow-md transition-all duration-300 
                  hover:scale-105 hover:shadow-lg hover:from-indigo-600 hover:to-blue-700 active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  Dashboard
                </Link>

                {isAdmin && (
                  <Link to="/admin" className={linkClass('/admin')}>
                    Admin
                  </Link>
                )}

                <div className="ml-3 flex items-center gap-3 pl-3 border-l border-gray-200">
                  
                  {/* 🔥 Avatar (CLICKABLE) */}
                  <Link to="/profile">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 
                    flex items-center justify-center text-indigo-600 font-semibold text-sm shadow-sm 
                    cursor-pointer hover:scale-105 transition-all duration-200">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 
                    hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 animate-fade-in">
          <Link to="/" className={`block ${linkClass('/')}`} onClick={() => setMenuOpen(false)}>Home</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className={`block ${linkClass('/login')}`} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className={`block ${linkClass('/signup')}`} onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={`block ${linkClass('/dashboard')}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>

              {isAdmin && (
                <Link to="/admin" className={`block ${linkClass('/admin')}`} onClick={() => setMenuOpen(false)}>Admin</Link>
              )}

              {/* 🔥 Mobile Profile */}
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-indigo-50"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium 
                text-red-500 hover:bg-red-50 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}