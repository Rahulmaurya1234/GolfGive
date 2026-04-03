# 🚀 Full Backend API Documentation (Frontend Guide)

---

# 🔗 Base URL

http://localhost:5000/api

---

# 🧠 Complete System Flow

Signup → OTP Verify → Login → Get Token  
→ Subscribe → Add Score  
→ Admin Simulate Draw → Run Draw → Winners → Verify  
→ Dashboard Data

---

# 🔐 AUTH MODULE

---

## 📝 1. Signup

POST /auth/signup

### Body:

{
  "name": "Rahul",
  "email": "rahul@test.com",
  "password": "123456",
  "mobile_no": "9999999999"
}

### Response:

{
  "message": "OTP sent successfully"
}

---

## 🔐 2. Verify OTP

POST /auth/verify-otp

{
  "email": "rahul@test.com",
  "otp": "123456"
}

---

## 🔑 3. Login

POST /auth/login

{
  "email": "rahul@test.com",
  "password": "123456"
}

### Response:

{
  "token": "JWT_TOKEN"
}

👉 Store token in:
- localStorage
- cookies

---

# 👤 USER MODULE

---

## 👤 Get Profile

GET /user/profile

Headers:
Authorization: Bearer TOKEN

---

# ❤️ CHARITY MODULE

---

## 📊 Get All Charities

GET /charity

---

# 💳 SUBSCRIPTION MODULE

---

## 🟢 Create Subscription

POST /subscription/create

{
  "plan": "monthly",
  "charityId": "CHARITY_ID",
  "charityPercentage": 10
}

---

## 📊 Get Subscription

GET /subscription/status

---

## ❌ Cancel Subscription

POST /subscription/cancel

---

# ⛳ SCORE MODULE

---

## ➕ Add Score

POST /scores

🔒 Requires:
- Auth
- Active Subscription

{
  "value": 25
}

### Rules:

- Range: 1–45
- Max 5 scores (rolling logic)

---

## 📊 Get Scores

GET /scores

---

# 🎯 DRAW MODULE (ADMIN)

---

## 🧪 Simulate Draw

POST /admin/simulate-draw

👉 Admin only  
👉 Does NOT save in DB  
👉 Used for preview/testing

---

## 🎲 Run Draw

POST /admin/run-draw

👉 Admin only  
👉 Saves final draw  
👉 ❗ Only once per month allowed

---

## 🏆 Winners List

GET /admin/winners

---

## ✅ Verify Winner

POST /admin/verify-winner

{
  "drawId": "DRAW_ID",
  "userId": "USER_ID",
  "status": "approved"
}

---

# 📊 ADMIN ANALYTICS

---

## 📊 Get Admin Stats

GET /admin/stats

### Response:

{
  "totalUsers": 120,
  "totalDraws": 5,
  "totalPrizePool": 50000,
  "totalCharity": 10000
}

---

# 📊 DASHBOARD MODULE

---

## 📊 Get Dashboard

GET /dashboard

### Response includes:

- User info
- Subscription
- Charity
- Scores
- Participation
- Winnings

---

# 🔐 AUTH RULES

Authorization: Bearer TOKEN

---

# 🎯 BUSINESS LOGIC

---

## 💰 Subscription

- Monthly → ₹1000  
- Yearly → ₹10000  

---

## ❤️ Charity

- Default: 10%  
- Deducted before prize  

---

## ⛳ Score

- Max 5 scores  
- Oldest replaced automatically  

---

## 🎲 Draw

- Admin controlled  
- Random numbers generated  
- Match logic applied  
- Monthly restriction enforced  

---

## 🏆 Winner Rules

| Match | Result   |
|------|----------|
| 5    | Jackpot  |
| 4    | Medium   |
| 3    | Small    |
| <3   | No Prize |

---

## 💰 Prize Distribution

- 40% → 5 match  
- 35% → 4 match  
- 25% → 3 match  

---

# 🔥 FRONTEND IMPLEMENTATION GUIDE

---

## 🟢 Pages

/login  
/signup  
/dashboard  
/subscription  
/scores  
/admin  

---

## 🧠 Flow

Login → Save Token  
→ Call APIs with token  
→ Show dashboard  
→ Admin panel (simulate + run draw)

---

## ⚠️ Important

- Always send Authorization header  
- Handle token expiry  
- Handle empty states  
- Handle API errors  
- Protect routes (admin/user)  

---

# 🎉 FINAL STATUS

✔ Backend Ready  
✔ APIs Ready  
✔ Secure  
✔ Simulation Added  
✔ Analytics Added  
✔ Monthly Draw Protection Added  
✔ Production Ready  

---

🚀 Ready for Frontend Development