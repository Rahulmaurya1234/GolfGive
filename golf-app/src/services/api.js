import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────
// POST /auth/signup → { name, email, password, mobile_no }
export const signup = (data) => api.post('/auth/signup', data);

// POST /auth/verify-otp → { email, otp }
export const verifyOtp = (data) => api.post('/auth/verify-otp', data);

// POST /auth/login → { email, password } → { token }
export const login = (data) => api.post('/auth/login', data);

// ── User ──────────────────────────────────────────────
// GET /user/profile → user object
export const getProfile = () => api.get('/user/profile');

export const updateProfile = (data) =>
  api.put('/user/update-profile', data);

export const changePassword = (data) =>
  api.post('/user/change-password', data);

// GET /dashboard → { userInfo, subscription, charity, scores, participation, winnings }
export const getDashboard = () => api.get('/dashboard');

// ── Scores ────────────────────────────────────────────
// GET /scores
export const getScores = () => api.get('/scores');

// POST /scores → { value: number } (range 1-45, max 5 rolling)
export const postScore = (data) => api.post('/scores', data);

// ── Subscription ──────────────────────────────────────
// GET /subscription/status
export const getSubscriptionStatus = () => api.get('/subscription/status');

// POST /subscription/create → { plan: "monthly"|"yearly", charityId, charityPercentage }
export const createSubscription = (data) => api.post('/subscription/create', data);

// POST /subscription/cancel
export const cancelSubscription = () => api.post('/subscription/cancel');

// GET /charity
export const getCharities = () => api.get('/charity');

// ── Admin // ── Admin ─────────────────────────────────────────────

// ✅ FIX: correct endpoint
export const getAdminStats = () => api.get('/admin/stats');

// 🎲 simulate draw (preview only)
export const simulateDraw = () => api.post('/admin/simulate-draw');

// 🚀 run actual draw (DB save)
export const runDraw = () => api.post('/admin/run-draw');

// 🏆 get all winners
export const getWinners = () => api.get('/admin/winners');

// ✅ verify winner
export const verifyWinner = (data) =>
  api.post('/admin/verify-winner', data);



// ==========================
// 👑 ADMIN GROUP (NEW)
// ==========================
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  simulateDraw: () => api.post('/admin/simulate-draw'),
  runDraw: () => api.post('/admin/run-draw'),
  getWinners: () => api.get('/admin/winners'),
  verifyWinner: (data) => api.post('/admin/verify-winner', data),
};

export default api;