# 🚀 Subscription API Documentation (Frontend Guide)

---

## 🔗 Base URL

```
http://localhost:5000/api/subscription
```

---

# 💳 1. Create Subscription

## 📌 Endpoint

```
POST /create
```

---

## 🔐 Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 📦 Request Body

```json
{
  "plan": "monthly",
  "charityId": "CHARITY_ID",
  "charityPercentage": 10
}
```

---

## 📌 Fields Explanation

| Field             | Type   | Required | Description            |
| ----------------- | ------ | -------- | ---------------------- |
| plan              | string | ✅        | monthly / yearly       |
| charityId         | string | ✅        | selected charity `_id` |
| charityPercentage | number | ❌        | default = 10           |

---

## 🎯 Important Notes

* charityId real database ID होना चाहिए
* पहले `/api/charity` से list fetch करो
* Random string production में मत use करो

---

## ✅ Success Response

```json
{
  "message": "Subscription successful",
  "subscription": {
    "user": "user_id",
    "plan": "monthly",
    "status": "active",
    "amount": 1000,
    "charityId": "charity_id",
    "charityPercentage": 10,
    "startDate": "2026-04-02",
    "endDate": "2026-05-02"
  }
}
```

---

## ❌ Error Cases

### Already Subscribed

```json
{
  "message": "Already subscribed"
}
```

### Invalid Plan

```json
{
  "message": "Invalid plan"
}
```

### Charity Missing

```json
{
  "message": "Charity selection required"
}
```

---

# 📊 2. Get Subscription Status

## 📌 Endpoint

```
GET /status
```

---

## 🔐 Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚠️ Important

* GET में body मत भेजो
* सिर्फ Authorization header भेजो

---

## ✅ Response

```json
{
  "_id": "subscription_id",
  "user": "user_id",
  "plan": "monthly",
  "status": "active",
  "amount": 1000,
  "charityId": {
    "_id": "charity_id",
    "name": "Save Children"
  },
  "charityPercentage": 10,
  "startDate": "2026-04-02",
  "endDate": "2026-05-02"
}
```

---

## ❌ No Subscription

```json
{
  "message": "No subscription found"
}
```

---

# ❌ 3. Cancel Subscription

## 📌 Endpoint

```
POST /cancel
```

---

## 🔐 Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ✅ Response

```json
{
  "message": "Subscription cancelled successfully"
}
```

---

## ❌ Error

```json
{
  "message": "No active subscription found"
}
```

---

# 🔐 Authentication

```
Authorization: Bearer <TOKEN>
```

---

# 🧠 Complete Flow

```
Login 
→ Get Token 
→ Fetch Charities 
→ Select Charity 
→ Create Subscription 
→ Check Status 
→ Cancel (optional)
```

---

# 🎯 Frontend Notes

* Token localStorage / cookies में store करो
* हर request में Authorization header भेजो
* Plan only monthly / yearly होना चाहिए
* UI में selected charity भेजो

---

# 🎉 Done

✔ Create subscription
✔ View status
✔ Cancel subscription
✔ Charity integrated
✔ Secure APIs
