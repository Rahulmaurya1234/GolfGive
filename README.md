# GolfGive Backend

This repository contains the backend system for the GolfGive application, built using Node.js and Express.js. The backend follows a modular MVC architecture and is designed to handle scalable, real-world application requirements.

---

## Overview

The backend manages core functionalities such as user authentication, admin controls, charity management, subscriptions, and real-time draw/score systems. It is structured for maintainability, scalability, and clean code practices.

---

## Tech Stack

- Node.js
- Express.js
- JavaScript
- MongoDB (or your DB, update if needed)
- REST API Architecture

---

## Project Structure

backend/
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── charityController.js
│   ├── dashboardController.js
│   ├── drawController.js
│   ├── scoreController.js
│   ├── subscriptionController.js
│   ├── userController.js
│   └── verificationController.js
│
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── checkCharity.js
│   └── subscriptionMiddleware.js
│
├── models/
│   ├── Charity.js
│   ├── Draw.js
│   ├── Score.js
│   ├── Subscription.js
│   └── User.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── charityRoutes.js
│   ├── dashboardRoutes.js
│   ├── drawRoutes.js
│   ├── scoreRoutes.js
│   ├── subscriptionRoutes.js
│   └── userRoutes.js
│
├── utils/
│
├── app.js
├── index.js
├── package.json

---

## Features

- User authentication and authorization
- Role-based access control (Admin/User)
- Charity management system
- Subscription handling
- Dashboard and analytics support
- Draw and scoring system
- Modular and scalable backend architecture
- RESTful API design

---

## Backend Architecture

- MVC (Model-View-Controller) pattern
- Controllers handle business logic
- Routes define API endpoints
- Models manage database schema
- Middleware handles authentication, validation, and access control

---

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/golfgive.git
cd backend
Install dependencies


npm install


Configure environment variables

Create a .env file and add:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key

Run the server

npm start

DEVELOPER MODE
