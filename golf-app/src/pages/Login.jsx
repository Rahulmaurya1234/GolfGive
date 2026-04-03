import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await login(form);
      // Backend returns only { token }
      const token = res.data?.token || res.data?.accessToken;
      if (!token) throw new Error('No token received');
      await loginUser(token); // fetches profile internally
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-cyan-50 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">⛳</span>
            </div>
            <span className="font-display font-bold text-2xl text-gray-900">GolfGive</span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-gray-900 mt-6">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account to continue</p>
        </div>

        <Card className="animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5 p-2">
            {error && (
              <div className="bg-red-50 border border-red-200 text-danger text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                required
              />
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}