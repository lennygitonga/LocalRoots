# Local Roots

A community-based web app where neighbours report abuse and request or offer help — all localised to their area.

---

## Live Links

- Frontend: https://local-roots-ncqw.vercel.app/
- Backend API: https://local-roots-backend.onrender.com 

---

## Pages

- **Home** — stats and app overview
- **Report Abuse** — report child abuse, domestic violence, or elderly mistreatment
- **Request Help** — post or respond to needs for food, clothing, shelter, water, or medicine
- **Community Chat** — public chat and private messages between helpers and those in need

---

## Tech Stack

**Frontend**
- React + Vite
- Redux Toolkit
- React Router
- Firebase Auth (email/password + Google)
- Tailwind CSS

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Deployed on Render

---


## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/reports | Get all reports |
| POST | /api/reports | Submit a report |
| PATCH | /api/reports/:id/resolve | Mark report as resolved |
| GET | /api/help | Get all help requests |
| POST | /api/help | Post a help request |
| PATCH | /api/help/:id/claim | Claim a help request |
| DELETE | /api/help/:id | Delete a help request |
| GET | /api/messages/public | Get public messages |
| POST | /api/messages | Send a message |

## Backend
- Local-roots-backend repository:https://github.com/lennygitonga/local-roots-backend

##About 
This project is done by **Lenny Gitonga**