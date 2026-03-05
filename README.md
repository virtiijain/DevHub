<div align="center">

# DevHub

### Build in public. Share your work. Grow together.

*A clean, straight-up space where devs vibe, learn, and connect.*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-devvhubb.vercel.app-000000?style=for-the-badge)](https://devvhubb.vercel.app/)
[![API Docs](https://img.shields.io/badge/📖_API_Docs-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://devhub-server-zugl.onrender.com/api-docs/)
[![Status](https://img.shields.io/badge/Status-Actively_Building-22c55e?style=for-the-badge)]()

<br/>

---

</div>

<br/>

## What is DevHub?

DevHub is a developer-first community platform where you can **build in public**, share your projects, ask technical questions, and document your learning journey — all in one place.

No noise. No clutter. Just devs helping devs. 

<br/>

---

## Features

<br/>

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  🔐  Auth & Profiles     →  JWT auth, skills, projects,          │
│                              protected routes                    │
│                                                                  │
│  📝  Posts & Feed        →  Create posts, like/unlike,           │
│                              comment, real-time updates          │
│                                                                  │
│  ❓  Q&A System          →  Ask questions, vote, comment,        │
│                              instant live syncing                │
│                                                                  │
│  ⚡  Real-Time Updates   →  Live posts, comments & votes          │
│                              powered by WebSockets               │
│                                                                  │
│  📖  API Documentation   →  Fully documented REST APIs           │
│                              via Swagger UI                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

<br/>

---

## Tech Stack

<br/>

<div align="center">

### Frontend
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

</div>

<br/>

---

## Architecture Overview

```
devhub/
│
├── 📂 frontend/                  # Next.js App
│   ├── app/                      # App Router pages
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utils, API calls
│
└── 📂 backend/                   # Express.js Server
    ├── controllers/              # Route handlers
    ├── models/                   # MongoDB schemas
    ├── routes/                   # API routes
    ├── middleware/               # Auth & error middleware
    └── socket/                   # WebSocket logic
```

<br/>

---

## API Documentation

Full API documentation is available via **Swagger UI**:

> **[https://devhub-server-zugl.onrender.com/api-docs/](https://devhub-server-zugl.onrender.com/api-docs/)**

Includes all endpoints for:
- Auth (register, login, profile)
- Posts (CRUD, likes, comments)
- Q&A (questions, votes, answers)

<br/>

---

## Roadmap

- [x] JWT Authentication & Profiles
- [x] Posts, Likes & Comments
- [x] Q&A System with Voting
- [x] Real-time updates via WebSockets
- [x] Swagger API Documentation
- [x] Notifications system
- [ ] Follow / Unfollow developers
- [x] Project showcase section
- [ ] Search & filter posts/questions
- [ ] Dark / Light mode toggle
- [ ] Mobile app (React Native)

<br/>

---


<div align="center">

**Made with 🖤 for the developer community**

</div>
