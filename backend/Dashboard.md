# 📊 User Dashboard API Documentation (Frontend Guide)

---

## 🔗 Base URL

```id="dashboard-base"
http://localhost:5000/api/dashboard
```

---

# 👤 1. Get User Dashboard

### Endpoint:

```id="dashboard-endpoint"
GET /
```

---

### Headers:

```id="dashboard-header"
Authorization: Bearer <JWT_TOKEN>
```

---

### 🔐 Access:

✔ Logged-in users only
❌ बिना token access नहीं

---

# 🧠 Dashboard में क्या मिलेगा?

👉 एक ही API में पूरा data:

* User info
* Subscription status
* Charity details
* Recent scores
* Participation stats
* Winnings history

---

# ✅ Success Response

```json id="dashboard-response"
{
  "user": {
    "name": "Rahul",
    "email": "rahul@gmail.com"
  },

  "subscription": {
    "status": "active",
    "renewalDate": "2026-05-02"
  },

  "charity": {
    "id": "charity_id",
    "name": "Save Children",
    "percentage": 10
  },

  "scores": {
    "total": 5,
    "recent": [
      { "value": 30 },
      { "value": 20 }
    ]
  },

  "participation": {
    "totalDraws": 10,
    "totalWins": 3,
    "totalAmount": 15000
  },

  "winnings": [
    {
      "drawId": "draw_id",
      "match": 5,
      "type": "5-match",
      "prize": 5000,
      "status": "approved",
      "date": "2026-04-02"
    }
  ]
}
```

---

# 📊 Response Breakdown

---

## 👤 User Info

```id="user-section"
user.name  
user.email
```

👉 Profile section में दिखेगा

---

## 💳 Subscription

```id="sub-section"
status → active / inactive  
renewalDate → expiry date
```

---

## ❤️ Charity

```id="charity-section"
name  
percentage  
```

👉 User ने कौन सी charity चुनी

---

## ⛳ Scores

```id="score-section"
total → total scores  
recent → last 5 scores
```

---

## 📈 Participation

```id="participation-section"
totalDraws  
totalWins  
totalAmount
```

---

## 🏆 Winnings

```id="winnings-section"
drawId  
match  
type  
prize  
status  
date
```

👉 History table में दिखेगा

---

# ❌ Error Response

```json id="dashboard-error"
{
  "message": "Internal server error"
}
```

---

# 🧠 Complete Flow

```id="dashboard-flow"
Login → Get Token → Call Dashboard API → Show Data
```

---

# 🎯 Frontend Usage

👉 Dashboard page में sections बनाओ:

---

## 🟢 Section 1: Profile

* Name
* Email

---

## 🟡 Section 2: Subscription

* Status
* Renewal Date

---

## 🔵 Section 3: Scores

* Last 5 scores

---

## 🟣 Section 4: Stats

* Total draws
* Wins
* Total earnings

---

## 🔴 Section 5: Winnings Table

* Draw history
* Prize
* Status

---

# ❗ Important Notes

* Data already filtered है (user-specific)
* Latest winnings first दिखाओ
* Empty state handle करो (no wins)
* Subscription inactive हो तो UI में alert दिखाओ

---

# 🎉 Done

User Dashboard ready 🚀

✔ Profile info
✔ Subscription status
✔ Scores
✔ Stats
✔ Winnings history
✔ Single API response
✔ Optimized (parallel queries) ⚡
