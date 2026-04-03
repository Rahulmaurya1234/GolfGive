# 👨‍💼 Admin API Documentation (Frontend Guide)

---

## 🔗 Base URL

```id="admin-base"
http://localhost:5000/api/admin
```

---

# 🔐 Authentication (IMPORTANT 🔥)

👉 सभी APIs के लिए:

```id="admin-auth"
Authorization: Bearer <ADMIN_TOKEN>
```

✔ Only admin access
❌ Normal user access नहीं

---

# 👑 1. Admin Dashboard

### Endpoint:

```id="admin-dashboard"
GET /dashboard
```

---

### ✅ Response:

```json id="admin-dashboard-res"
{
  "message": "Welcome Admin 👑",
  "admin": {
    "_id": "admin_id",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

# 🎯 2. Run Draw

### Endpoint:

```id="run-draw"
POST /run-draw
```

---

### ✅ Description:

👉 पूरे system का draw run करता है
👉 winners calculate करता है
👉 prize distribute करता है

---

### ✅ Response:

```json id="run-draw-res"
{
  "drawId": "draw_id",
  "drawNumbers": [5, 12, 23, 34, 41],
  "totalPool": 50000,
  "charityTotal": 5000,
  "jackpot": 10000,
  "results": [
    {
      "user": "user_id",
      "match": 5,
      "result": {
        "type": "5-match",
        "prize": 10000,
        "status": "pending"
      }
    }
  ]
}
```

---

### ❌ Error Case:

```json id="run-draw-error"
{
  "message": "No active subscriptions"
}
```

---

# 🏆 3. Get Winners

### Endpoint:

```id="get-winners"
GET /winners
```

---

### ✅ Response:

```json id="winners-res"
[
  {
    "drawId": "draw_id",
    "user": {
      "_id": "user_id",
      "name": "Rahul",
      "email": "rahul@gmail.com"
    },
    "match": 5,
    "prize": 10000,
    "status": "pending"
  }
]
```

---

# ✅ 4. Verify Winner

### Endpoint:

```id="verify-winner"
POST /verify-winner
```

---

### Body:

```json id="verify-body-admin"
{
  "drawId": "DRAW_ID",
  "userId": "USER_ID",
  "status": "approved"
}
```

---

### Status Options:

* `approved`
* `rejected`

---

### ✅ Response:

```json id="verify-res"
{
  "message": "Winner approved successfully",
  "result": {
    "user": "user_id",
    "match": 5,
    "result": {
      "type": "5-match",
      "prize": 10000,
      "status": "approved"
    }
  }
}
```

---

### ❌ Error Cases:

#### Invalid Status

```json id="invalid-status"
{
  "message": "Invalid status"
}
```

#### Not a Winner

```json id="not-winner"
{
  "message": "This user is not a winner"
}
```

#### Already Approved

```json id="already-approved"
{
  "message": "Already approved"
}
```

---

# 👥 5. Get All Users

### Endpoint:

```id="get-users"
GET /users
```

---

### ✅ Response:

```json id="users-res"
{
  "count": 2,
  "data": [
    {
      "_id": "user_id",
      "name": "Amit",
      "email": "amit@gmail.com"
    }
  ]
}
```

---

# 🎲 6. Get All Draws

### Endpoint:

```id="get-draws-admin"
GET /draws
```

---

### ✅ Response:

```json id="draws-res-admin"
{
  "count": 2,
  "data": [
    {
      "_id": "draw_id",
      "numbers": [5, 12, 23, 34, 41],
      "totalPool": 50000,
      "jackpot": 10000,
      "createdAt": "2026-04-02"
    }
  ]
}
```

---

# 🧠 Complete Admin Flow

```id="admin-flow"
Login (Admin) → Run Draw → View Winners → Verify Winners → Manage System
```

---

# 🎯 Frontend Usage

👉 Admin panel में ये pages बनाओ:

---

## 🟢 Dashboard

* Welcome message
* Admin info

---

## 🟡 Draw Control

* Run Draw button

---

## 🔴 Winners Page

* Winners list
* Approve / Reject buttons

---

## 🔵 Users Page

* All users list

---

## 🟣 Draw History

* Past draws

---

# ❗ Important Notes

* Draw manually trigger होता है
* Winners पहले `pending` रहते हैं
* Admin approve/reject करता है
* Approved winners को payout मिलेगा
* APIs fully secure हैं

---

# 🎉 Done

Admin module ready 🚀

✔ Draw control
✔ Winner verification
✔ User management
✔ Draw history
✔ Secure admin APIs 🔐

{
  "email": "rahul2003maurya@gmail.com",
  "otp": "701265",
  "newPassword": "Maurya@#2003"
}