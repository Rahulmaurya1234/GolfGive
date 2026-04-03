// AUTH
export const signup = (data) => api.post('/api/auth/signup', data);
export const verifyOtp = (data) => api.post('/api/auth/verify-otp', data);
export const login = (data) => api.post('/api/auth/login', data);

// USER
export const getProfile = () => api.get('/api/user/profile');
export const updateProfile = (data) => api.put('/api/user/update-profile', data);
export const changePassword = (data) => api.post('/api/user/change-password', data);

// DASHBOARD
export const getDashboard = () => api.get('/api/dashboard');

// SCORES
export const getScores = () => api.get('/api/scores');
export const postScore = (data) => api.post('/api/scores', data);

// SUBSCRIPTION
export const getSubscriptionStatus = () => api.get('/api/subscription/status');
export const createSubscription = (data) => api.post('/api/subscription/create', data);
export const cancelSubscription = () => api.post('/api/subscription/cancel');

// CHARITY
export const getCharities = () => api.get('/api/charity');

// ADMIN
export const getAdminStats = () => api.get('/api/admin/stats');
export const simulateDraw = () => api.post('/api/admin/simulate-draw');
export const runDraw = () => api.post('/api/admin/run-draw');
export const getWinners = () => api.get('/api/admin/winners');
export const verifyWinner = (data) => api.post('/api/admin/verify-winner', data);