# 🚀 Score API Documentation (Frontend Guide)

---

## 🔗 Base URL

```
http://localhost:5000/api/score
```

---

# ⛳ 1. Add Score

### Endpoint:

```
POST /
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### ✅ Body:

```json
{
  "value": 25
}
```

---

### 📌 Rules:

* Value range: **1 to 45**
* Max **5 scores per user**
* Oldest score auto-delete ho jayega

---

### ⚠️ Requirements:

✔ User logged in hona chahiye
✔ Active subscription hona chahiye
✔ Subscription expired nahi hona chahiye

---

### ✅ Success Response:

```json
{
  "message": "Score added successfully",
  "data": {
    "_id": "score_id",
    "user": "user_id",
    "value": 25,
    "createdAt": "2026-04-02T10:00:00Z"
  }
}
```

---

### ❌ Error Cases:

#### Invalid Value

```json
{
  "message": "Score must be between 1-45"
}
```

#### Missing Value

```json
{
  "message": "Score value required"
}
```

#### No Subscription

```json
{
  "message": "Subscription required"
}
```

#### Subscription Expired

```json
{
  "message": "Subscription expired"
}
```

---

# 📊 2. Get Scores

### Endpoint:

```
GET /
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### ⚠️ Important:

* ❌ Body send mat karo
* ✅ Sirf Authorization header bhejo

---

### ✅ Response:

```json
{
  "count": 3,
  "data": [
    {
      "_id": "score_id",
      "value": 30,
      "createdAt": "2026-04-02T10:00:00Z"
    },
    {
      "_id": "score_id",
      "value": 20,
      "createdAt": "2026-04-01T10:00:00Z"
    }
  ]
}
```

---

# 🔐 Authentication & Access Rules

👉 All APIs protected hain:

```
Authorization: Bearer <TOKEN>
```

---

### 🔒 Middleware Flow:

```
authMiddleware → checkSubscription → add/get score
```

---

# 🧠 Complete Flow

```
Login → Get Token → Subscribe → Add Score → View Scores
```

---

# 🎯 Notes (Frontend Developers)

* Max 5 scores allowed (auto replace logic)
* Latest scores upar show honge
* Score range strict hai (1–45)
* Subscription active hona must hai
* Expired subscription me score add nahi hoga

---

# 🎉 Done

Score module ready 🚀

✔ Add score
✔ Get scores
✔ Subscription protected
✔ Auto limit (5 scores)
✔ Secure APIs 🔐
