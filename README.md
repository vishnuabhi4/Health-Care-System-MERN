# Health Care System – Full Stack Application

A production-grade **Healthcare Management Platform** built using the **MERN stack**, designed to streamline doctor–patient interactions with secure authentication, appointment management, medical records, and an admin workflow.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based secure login and signup
* Separate access levels for **Patients**, **Doctors**, and **Admin**
* Protected routes implemented on both frontend and backend

### 🩺 Doctor Module

* Add and manage doctor profiles
* Clinical schedule setup: available days, start/end time, availability automation
* View appointments and manage patient interactions

### 👤 Patient Module

* Profile management
* Book appointments with real-time available slots
* View doctor details, reports, and booking history

### 📅 Appointment Management

* Backend-generated availability logic
* Handles schedule conflicts and dynamic slot generation
* Appointment status tracking

### 🧾 Medical Reports

* Add, edit, and view patient medical reports
* Doctor-specific record access

### 📞 Contact & Support

* Contact form integrated through backend API

### 🖥️ Admin Dashboard

* Manage users, doctors, appointments, and approvals

---

## 🛠️ Tech Stack

### **Frontend:**

* React.js
* React Router
* Redux Toolkit
* Tailwind CSS
* Axios

### **Backend:**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* CORS

### **Deployment:**

* Vercel (Frontend & Backend)
* MongoDB Atlas

---

## 📁 Folder Structure

### **Backend**

```
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── utils/
│── config/
└── server.js
```

### **Frontend**

```
frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── api/
│   ├── utils/
│   ├── data/
│   └── App.jsx
└── index.js
```

---

## ⚙️ Environment Variables

### Backend `.env`

```
MONGO_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### Frontend `.env`

```
VITE_BACKEND_URL=https://your-backend-domain.vercel.app/api
```

---

## ▶️ Running the Project Locally

### 1. Clone the Repository

```
git clone https://github.com/your-username/health-care-system.git
cd health-care-system
```

### 2. Start Backend

```
cd backend
npm install
npm start
```

### 3. Start Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🚢 Deployment Notes

* Ensure correct **CORS allowed origins** (all active Vercel frontend URLs)
* Add both Production & Preview domains to backend CORS
* Use Vercel Environment Variables for API URLs

---

## 🧪 API Endpoints (Sample)

### Authentication

```
POST /api/auth/login
POST /api/auth/register
```

### Doctors

```
GET /api/doctor/profile/:id
POST /api/doctor/add-info
```

### Appointments

```
POST /api/appointment/book
GET /api/appointment/doctor/:id
```

---

## 🏗️ Current Status

* Authentication stable
* Appointments functional
* Backend CORS settings under refinement
* UI/UX improvements ongoing

---

## 🤝 Contribution Guide

1. Create a new branch before pushing changes

```
git checkout -b feature-name
```

2. Commit with meaningful messages
3. Push and create a pull request

---

## 📄 License

MIT License

---

## 💬 Contact

If you have any issues or feature requests, feel free to open an issue or contact me directly.

---

**Thank you for exploring the Healthcare System Application!**
