# 🏌️ Score API Documentation (Frontend Guide)

---

## 🔗 Base URL

```
http://localhost:5000/api/scores
```

---

# ➕ 1. Add Score

### Endpoint:

```
POST /
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Body:

```json
{
  "value": 25
}
```

---

### 📌 Rules:

* Score range: `1 - 45`
* User must be subscribed ✅
* Max 5 scores allowed (automatic replacement)

---

### Response:

```json
{
  "message": "Score added successfully",
  "data": {
    "_id": "score_id",
    "user": "user_id",
    "value": 25,
    "date": "2026-04-02T17:16:04.933Z"
  }
}
```

---

### ❌ Error Cases:

#### Invalid Score

```json
{
  "message": "Score must be between 1-45"
}
```

---

#### Missing Value

```json
{
  "message": "Score value required"
}
```

---

#### Not Subscribed

```json
{
  "message": "Subscription required"
}
```

---

#### Unauthorized

```json
{
  "message": "Invalid token"
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
* ✅ Latest scores first (descending order)

---

### Response:

```json
{
  "count": 5,
  "data": [
    {
      "_id": "score_id",
      "value": 50,
      "date": "2026-04-06"
    },
    {
      "_id": "score_id",
      "value": 40,
      "date": "2026-04-05"
    }
  ]
}
```

---

# 🔁 Score Logic (Important)

```
User ke max 5 scores store honge
```

### Example:

```
[10, 20, 30, 40, 50]

+ new score = 60

➡ delete 10
➡ final:
[20, 30, 40, 50, 60]
```

---

# 🔐 Authentication Required

👉 Sabhi APIs protected hain

```
Authorization: Bearer <TOKEN>
```

---

# 🧠 Complete Flow

```
Login → Get Token → Add Score → View Scores
```

---

# 🎯 Notes (Frontend Developers)

* Token ko localStorage / cookies me store karo
* Har request me Authorization header bhejo
* Score manually delete/edit nahi kar sakte ❌
* System automatically oldest score replace karega ✅

---

# 🎉 Done

Score module ready 🚀

* Add score ✅
* Get scores ✅
* Auto replace logic ✅
* Auth + Subscription protected 🔐
