# 📌 Productivity Dashboard

A full-stack productivity dashboard built with **Node.js**, **Express**, and **Vanilla JavaScript**, 
designed to help users manage daily tasks, plan schedules, stay focused with a Pomodoro timer, and 
get inspired by a dynamic **Quote of the Day** from an external API.

---

## 🧠 Features

* **Quote of the Day** – secured via backend API proxy
* **Todo List** – with LocalStorage persistence
* **Daily Planner** – hourly schedule with auto-save
* **Pomodoro Timer** – 25/5 work-break cycle
* **Dynamic Theme Switcher** – light/dark mode
* **Fully Responsive Layout**
* **Secure API key handling** using environment variables

---

## 🏗️ Architecture

```
Frontend (Vercel)
      ⬇ Fetch Request
Backend (Render - Express API)
      ⬇ Secure API Call
API Ninjas Quote API
```

> API keys are never exposed to the frontend.

---

## 🛠️ Tech Stack

**Frontend:**

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage API

**Backend:**

* Node.js
* Express.js
* CORS
* dotenv

**Deployment:**

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```
Productivity-Dashboard/
│
├── BackEnd/
│   ├── server.js
│   ├── package.json
│   └── .env          # not committed
│
├── FrontEnd/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
└── README.md
```
---

## 💻 Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/productivity-dashboard.git
cd productivity-dashboard
```

2. **Install backend dependencies**

```bash
cd BackEnd
npm install
```

3. **Add environment variable**
   Create `.env` inside `BackEnd/`:
```
API_KEY=your_api_key_here
```

4. **Run backend**

```bash
node server.js
```

Backend runs at: `http://localhost:3000`

5. **Run frontend**
   Open `FrontEnd/index.html` using Live Server
   **OR**

```bash
cd FrontEnd
npx serve .
```

Frontend runs at: `http://127.0.0.1:5500`

---

## 📦 Deployment

**Backend (Render)**

* Root Directory: `BackEnd`
* Build Command: `npm install`
* Start Command: `node server.js`
* Add Environment Variable: `API_KEY`

**Frontend (Vercel)**

* Root Directory: `FrontEnd`
* Framework: Other
* Update frontend fetch URL to production backend URL before deployment

---

## 🧪 Key Learning Outcomes

* API integration with secure backend proxy
* Environment variable management
* LocalStorage persistence
* Client-server architecture
* CORS handling
* Production deployment workflow
* Meaningful Git commit practices

---

## 📈 Future Improvements

* User authentication system
* Database integration (MongoDB/PostgreSQL)
* Drag-and-drop task management
* Analytics dashboard
* PWA support
* Dark mode auto-detection

---

## 👤 Author

**Shrinivas Nakadi**
* LinkedIn: [https://www.linkedin.com/in/shrinivas-nakadi-2b48b1240/](https://www.linkedin.com/in/shrinivas-nakadi-2b48b1240/)

---
