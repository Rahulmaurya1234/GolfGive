import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Profile from "./pages/Profile";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 font-body">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                  <div className="text-center">
                    <div className="text-7xl mb-4">⛳</div>
                    <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">404 — Out of Bounds</h2>
                    <p className="text-gray-500 mb-8">This page doesn't exist. Let's get you back on the fairway.</p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-indigo-600 transition-colors shadow-md"
                    >
                      ← Back to Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
