# 🎯 Draw API Documentation (Frontend + Admin Guide)

---

## 🔗 Base URL

```id="draw-base"
http://localhost:5000/api
```

---

# ⚠️ IMPORTANT (VERY IMPORTANT 🔥)

👉 Draw **user नहीं चलाता**
👉 Draw सिर्फ **Admin चलाता है**

❌ `/draw/run` (user route) → avoid करो
✔ `/admin/run-draw` → सही route

---

# 👨‍💼 1. Run Draw (Admin Only)

### Endpoint:

```id="draw-run"
POST /admin/run-draw
```

---

### Headers:

```id="draw-headers"
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

---

### 🔐 Access:

✔ Admin only
❌ Normal user allowed नहीं

---

### ✅ Success Response:

```json id="draw-success"
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

```json id="draw-error"
{
  "message": "No active subscriptions"
}
```

---

# 🧠 Draw Logic (Frontend Understanding)

```id="draw-flow"
1. Active users filter
2. Scores fetch
3. Match calculation
4. Charity deduction
5. Prize pool create
6. Winners decide
7. Jackpot update
8. Results save
```

---

# 📊 2. Get All Draws (Admin)

### Endpoint:

```id="get-draws"
GET /admin/draws
```

---

### Headers:

```id="draws-header"
Authorization: Bearer <ADMIN_TOKEN>
```

---

### ✅ Response:

```json id="draws-response"
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

# 🏆 3. Get Winners (Admin)

### Endpoint:

```id="get-winners"
GET /admin/winners
```

---

### Headers:

```id="winner-header"
Authorization: Bearer <ADMIN_TOKEN>
```

---

### ✅ Response:

```json id="winner-response"
{
  "count": 2,
  "data": [
    {
      "drawId": "draw_id",
      "user": {
        "_id": "user_id",
        "name": "Rahul"
      },
      "match": 5,
      "prize": 10000,
      "status": "pending"
    }
  ]
}
```

---

# ✅ 4. Verify Winner (Admin)

### Endpoint:

```id="verify-winner"
POST /admin/verify-winner
```

---

### Headers:

```id="verify-header"
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

---

### Body:

```json id="verify-body"
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

```json id="verify-response"
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

# 🔐 Authentication Rules

```id="auth-rule"
User Token → normal APIs  
Admin Token → draw + verify APIs  
```

---

# 🧠 Complete System Flow

```id="full-flow"
User:
Login → Subscribe → Add Score

Admin:
Run Draw → View Winners → Verify → Approve

System:
Match → Prize → Save → Display
```

---

# ❗ Important Notes

* Draw manually admin run करेगा
* Users खुद draw trigger नहीं कर सकते
* 5 scores mandatory हैं
* Charity पहले deduct होता है
* Winners पहले pending रहते हैं
* Admin verification के बाद ही payout होगा

---

# 🎉 Done

Draw module ready 🚀

✔ Draw execution
✔ Winner calculation
✔ Prize distribution
✔ Charity deduction
✔ Jackpot system
✔ Admin verification
✔ Secure APIs 🔐
