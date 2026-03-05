# 📌 Productivity Dashboard

A minimal full-stack productivity dashboard built with **Vanilla JavaScript, Node.js, and Express** to help users organize their day, stay focused, and stay motivated.

The application combines **task management, habit tracking, scheduling, focus sessions, and daily motivation** into one lightweight interface.

---

# 🔗 Live Demo

**Frontend**
[https://productivity-dashboard-eight-tau.vercel.app/](https://productivity-dashboard-eight-tau.vercel.app/)

**Backend API**
[https://productivity-dashboard-vnug.onrender.com/api/quote](https://productivity-dashboard-vnug.onrender.com/api/quote)

---

# ✨ Features

### 📝 Todo List

Create and manage daily tasks with **LocalStorage persistence**.

### 📅 Daily Planner

Plan your day with an **hourly schedule** that automatically saves progress.

### 🔁 Habit Tracker

Track recurring habits and monitor daily consistency.

### ⏱ Pomodoro Timer

Built-in **25 / 5 focus timer** to structure work sessions and breaks.

### 💬 Quote of the Day

Motivational quotes fetched securely through a **backend API proxy**.

### 🎨 Theme Switcher

Toggle between **light and dark modes**.

### 📱 Responsive Design

Optimized layout for **desktop, tablet, and mobile devices**.

---

# 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* LocalStorage API

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### Deployment

* **Vercel** – Frontend hosting
* **Render** – Backend API hosting

---

# 📂 Project Structure

```
Productivity-Dashboard
│
├── BackEnd
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── FrontEnd
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets
│
└── README.md
```

---

# ⚙️ Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shri-coder413/productivity-dashboard.git
cd productivity-dashboard
```

---

### 2️⃣ Setup Backend

```bash
cd BackEnd
npm install
```

Create `.env`

```
API_KEY=your_api_key_here
```

Run the server

```bash
node server.js
```

Backend runs at

```
http://localhost:3000
```

---

### 3️⃣ Run Frontend

Open

```
FrontEnd/index.html
```

or run using Live Server.

---

# 🔐 API Security

The external quote API is accessed through a **backend proxy**, ensuring the API key remains hidden and is never exposed to the client.

---

# 🚀 Future Improvements

* User authentication
* Database integration
* Drag-and-drop task management
* Habit analytics and streak tracking
* PWA support
* Pomodoro session statistics

---

# 👤 Author

**Shrinivas Nakadi**

LinkedIn
[https://www.linkedin.com/in/shrinivas-nakadi-2b48b1240/](https://www.linkedin.com/in/shrinivas-nakadi-2b48b1240/)

---
