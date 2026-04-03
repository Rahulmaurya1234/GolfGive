# GolfGive — Frontend

A modern React + Vite frontend for the GolfGive platform. Play golf, win prizes, and give back to charity.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173` by default.

## 🔌 Backend

Make sure your backend is running at `http://localhost:5000/api`.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Adaptive nav (guest / user / admin)
│   ├── Card.jsx            # Card + StatCard components
│   ├── Button.jsx          # Multi-variant button
│   ├── Table.jsx           # Reusable data table
│   └── ProtectedRoute.jsx  # Auth + Admin route guards
├── pages/
│   ├── Home.jsx            # Landing page (no API)
│   ├── Login.jsx           # POST /auth/login
│   ├── Signup.jsx          # POST /auth/signup + /auth/verify-otp
│   ├── Dashboard.jsx       # Profile, Scores, Subscription tabs
│   ├── Admin.jsx           # Stats, Draws, Winners
│   ├── Scores.jsx          # GET/POST /scores
│   └── Subscription.jsx    # Plans, Charities, Subscribe/Cancel
├── services/
│   └── api.js              # Axios instance + all API calls
├── context/
│   └── AuthContext.jsx     # JWT auth state (localStorage)
├── App.jsx                 # Router + route definitions
└── main.jsx                # React entry point
```

## 🎨 Design System

| Token       | Value     |
|-------------|-----------|
| Primary     | `#4F46E5` |
| Secondary   | `#06B6D4` |
| Success     | `#22C55E` |
| Danger      | `#EF4444` |
| Background  | `#F9FAFB` |
| Card        | `#FFFFFF`  |
| Text        | `#111827` |

## 🔐 Auth Flow

1. User logs in → `POST /auth/login` → receives `{ token, user }`
2. Token stored in `localStorage`
3. Axios interceptor attaches `Authorization: Bearer <token>` to every request
4. 401 response auto-redirects to `/login`
5. Role-based routing: `user.role === 'admin'` unlocks `/admin`
