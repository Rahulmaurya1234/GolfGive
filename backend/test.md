# 🚀 Backend Auth Project (Node.js + Express)

## 📦 Installed Packages & Their Use

### 🌐 express

* Backend server banane ke liye use hota hai
* Routes handle karta hai (login, signup, etc.)

---

### 🗄️ mongoose

* MongoDB database se connect karne ke liye
* Data ko store aur fetch karne me help karta hai

---

### 🔐 bcrypt

* Password ko hash (secure) karne ke liye
* Plain password kabhi store nahi hota

---

### 🔑 jsonwebtoken (JWT)

* Authentication ke liye token generate karta hai
* Login ke baad user ko verify karne me use hota hai

---

### ⚙️ dotenv

* Environment variables manage karta hai
* Secret keys (.env file) me store hoti hain

---

### 🌍 cors

* Frontend aur backend ko connect karne ke liye
* Different origin requests allow karta hai

---

### ✅ express-validator

* Request validation ke liye middleware
* Input fields (email, password) validate karta hai

---

### 🔍 validator

* Data validation ke liye helper library
* Email, URL, etc. check karne ke liye

---

## 🛠️ Dev Dependency

### 🔄 nodemon

* Development me server auto restart karta hai
* Code change hote hi server reload ho jata hai

---

## ⚡ Project Purpose

Ye project ek **Authentication System** banane ke liye hai jisme:

* User Signup
* User Login
* Password Hashing
* JWT Authentication
* Protected Routes

---

## 📁 Recommended Folder Structure

```
/models
/controllers
/routes
/middleware
/config
```

---

## 🔐 Features

* Secure password storage (bcrypt)
* Token-based authentication (JWT)
* Input validation
* MongoDB integration
* Clean backend structure

---

## 🚀 How to Run

```
npm install
npm run dev
```

---

## 🧾 Notes

* `.env` file me secrets store karo
* JWT secret public mat karo
* Password kabhi plain text me store na karo

---

🔥 Happy Coding!
