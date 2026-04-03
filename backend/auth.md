# 🚀 Authentication & Admin API Documentation (Frontend Guide)

---

## 🔗 Base URL

```
http://localhost:3000/api
```

---

# 📝 1. Signup

### Endpoint:

```
POST /auth/signup
```

### Body:

```json
{
  "name": "Rahul",
  "email": "rahul@test.com",
  "password": "123456",
  "mobile_no": "9999999999"
}
```

### Response:

```json
{
  "message": "OTP sent successfully"
}
```

---

# 🔐 2. Verify OTP

### Endpoint:

```
POST /auth/verify-otp
```

### Body:

```json
{
  "email": "rahul@test.com",
  "otp": "123456"
}
```

### Response:

```json
{
  "message": "User verified successfully"
}
```

---

# 🔑 3. Login

### Endpoint:

```
POST /auth/login
```

### Body:

```json
{
  "email": "rahul@test.com",
  "password": "123456"
}
```

### Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```

👉 Save this token in:

* localStorage
* cookies

---

# 🔒 4. Get User Profile (Protected Route)

### Endpoint:

```
GET /user/profile
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

### Response:

```json
{
  "message": "Profile data",
  "user": {
    "id": "user_id",
    "name": "Rahul",
    "email": "rahul@test.com",
    "role": "user"
  }
}
```

---

# 👑 5. Admin Dashboard (Admin Only)

### Endpoint:

```
GET /admin/dashboard
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

### Access:

* ❌ User → Access Denied
* ✅ Admin → Access Allowed

### Response:

```json
{
  "message": "Welcome Admin 👑",
  "user": {
    "id": "admin_id",
    "role": "admin"
  }
}
```

---

# 👥 6. Get All Users (Admin Only)

### Endpoint:

```
GET /admin/users
```

### Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

### Response:

```json
[
  {
    "name": "Rahul",
    "email": "rahul@test.com",
    "role": "user"
  }
]
```

---

# 🔁 7. Resend OTP

### Endpoint:

```
POST /auth/resend-otp
```

### Body:

```json
{
  "email": "rahul@test.com"
}
```

### Response:

```json
{
  "message": "OTP resent successfully"
}
```

---

# 🔐 8. Forgot Password

### Endpoint:

```
POST /auth/forgot-password
```

### Body:

```json
{
  "email": "rahul@test.com"
}
```

### Response:

```json
{
  "message": "OTP sent for password reset"
}
```

---

# 🔄 9. Reset Password

### Endpoint:

```
POST /auth/reset-password
```

### Body:

```json
{
  "email": "rahul@test.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

### Response:

```json
{
  "message": "Password reset successful"
}
```

---

# ⚠️ Important Notes (Frontend)

* Always send:

```
Content-Type: application/json
```

* Store JWT token after login

* Protected routes में header भेजो:

```
Authorization: Bearer <TOKEN>
```

---

# 🧠 Complete Flow

```
Signup → OTP → Verify → Login → JWT Token → Access Protected Routes → Admin Access (if role = admin)
```

---

# 🔐 Security Best Practices

* Never expose JWT_SECRET in frontend
* Store token securely
* Logout = remove token
* Handle token expiry (1h)

---

# 🎯 API Structure

```
/api
   ├── /auth
   │     ├── signup
   │     ├── login
   │     ├── verify-otp
   │     ├── resend-otp
   │     ├── forgot-password
   │     └── reset-password
   │
   ├── /user
   │     └── profile (protected)
   │
   └── /admin
         ├── dashboard (admin only)
         └── users (admin only)
```

---

# 🎉 Done

Backend is fully ready 🚀

* Authentication ✅
* JWT Security ✅
* Protected Routes ✅
* Admin Panel Ready 👑

Now you can connect frontend (React / HTML)
