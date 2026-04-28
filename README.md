# GolfGive Full Stack Application

GolfGive is a full stack web application built using the MERN stack along with a modular Node.js backend. The platform includes features such as user authentication, charity management, subscriptions, and real-time draw and score systems.

---

## Overview

The project is divided into two main parts:

- Frontend: Built using React.js with modern UI practices  
- Backend: Built using Node.js and Express.js with MVC architecture  

The system is designed for scalability, modularity, and real-world application use cases.

---

## Tech Stack

### Frontend
- React.js  
- JavaScript  
- Tailwind CSS  
- Vite  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- REST API Architecture  

---

## Project Structure

GolfGive/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── adminController.js
│ │ ├── authController.js
│ │ ├── charityController.js
│ │ ├── dashboardController.js
│ │ ├── drawController.js
│ │ ├── scoreController.js
│ │ ├── subscriptionController.js
│ │ ├── userController.js
│ │ └── verificationController.js
│ ├── middleware/
│ │ ├── adminMiddleware.js
│ │ ├── authMiddleware.js
│ │ ├── checkCharity.js
│ │ └── subscriptionMiddleware.js
│ ├── models/
│ │ ├── Charity.js
│ │ ├── Draw.js
│ │ ├── Score.js
│ │ ├── Subscription.js
│ │ └── User.js
│ ├── routes/
│ │ ├── adminRoutes.js
│ │ ├── authRoutes.js
│ │ ├── charityRoutes.js
│ │ ├── dashboardRoutes.js
│ │ ├── drawRoutes.js
│ │ ├── scoreRoutes.js
│ │ ├── subscriptionRoutes.js
│ │ └── userRoutes.js
│ ├── utils/
│ ├── app.js
│ ├── index.js
│ └── package.json
│
├── golf-app/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ ├── package.json
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ └── vite.config.js


---

## Features

- User authentication and authorization  
- Role-based access control (Admin/User)  
- Charity management system  
- Subscription handling  
- Dashboard and analytics  
- Draw and scoring system  
- Responsive frontend UI  
- RESTful API integration  
- Modular and scalable architecture  

---

## Frontend Details

- Built using React.js with component-based architecture  
- Context API for state management  
- API integration using service layer  
- Structured folders (components, pages, services, context)  
- Responsive design using Tailwind CSS  

---

## Backend Details

- MVC architecture (Models, Controllers, Routes)  
- Middleware for authentication and authorization  
- Modular API structure  
- RESTful API design  
- Scalable backend architecture  

---

## Installation & Setup

### 1. Clone the repository

git clone https://github.com/Rahulmaurya1234/GolfGive.git
cd GolfGive

# 2. Setup Backend

cd backend
npm install
npm start

# 3. Setup Frontend

cd golf-app
npm install
npm run dev

Environment Variables

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key

Future Improvements
Real-time updates using WebSockets
Payment gateway integration
Admin dashboard enhancements
API documentation (Swagger/Postman)

Author

Rahul Maurya
GitHub: https://github.com/Rahulmaurya1234

Portfolio: https://rahulmaurya1234.github.io/my-portfolio/

Email: rahul2003maurya@gmail.com

---

## Live Demo

https://golf-give-seven.vercel.app/

---

```bash
