🚉 RailSync: Real-Time Train Intelligence
Transforming the Indian Commute with Real-Time Data & Intelligent Routing.

📖 Project Overview
Problem Statement
Millions of local trains in India run late every day, yet commuters rarely receive accurate, real-time updates or actionable route alternatives. This uncertainty leads to delays, missed connections, overcrowded stations, and inefficient travel.

Solution
RailSync is a web application providing real-time train status, delay predictions, and alternative route suggestions. By integrating mock real-time data with intelligent routing logic, we help commuters make faster, more informed decisions.

🎯 Project Goals (MVP)
Live Feed: View real-time train arrival/delay information.

Smart Routing: Receive alternative travel suggestions when delays occur.

User Accounts: Secure authentication for personalized commute tracking.

Speed: 15-second data refresh intervals for "Live" accuracy.

🛠 Tech Stack
Frontend: React.js, TailwindCSS, Lucide Icons, Axios.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose).

Security: JWT Authentication, Bcrypt.js.

Deployment: Vercel (Frontend), Render (Backend).

🏗 High-Level Architecture
The application uses a modern MERN stack where the backend serves a Mock Data Engine to simulate live train movements across the Indian Railways network.

📅 4-Week Sprint Roadmap
Week 1: Foundation & Architecture
Goal: Establish the "Contract" between Frontend and Backend.

Backend: Setup Node/Express, MongoDB schema, and JWT Auth.

Frontend: Wireframes in Figma, React project scaffold, Tailwind integration.

DevOps: GitHub repo setup with branch protection.

Week 2: Core Feature Development
Goal: Getting data into the system and onto the screen.

Backend: Mock Train Data Generator, CRUD for Train Status, Search/Filter API.

Frontend: Dashboard layout, Train Status Cards, Auth State management.

Logic: Basic delay prediction algorithm (Randomized fluctuation).

Week 3: Integration & "Real-Time" Logic
Goal: Connecting the system and simulating live updates.

Backend: Alternate Route Logic, API error handling, Unit testing.

Frontend: API Integration (Axios), Polling implementation (15s intervals), Mobile responsiveness.

DevOps: CI/CD pipeline setup via GitHub Actions.

Week 4: Polish & Launch
Goal: Ironing out bugs and going live.

Testing: End-to-End manual testing, bug squashing.

Frontend: Loading states, Toast notifications, UI/UX final polish.

Deployment: Final push to Render/Vercel and project documentation.




Role,Responsibility
Full-Stack Lead,"Project structure, Backend APIs, DB Schema, Major feature integration."
Frontend & UX Developer,"UI Design, React components, Dashboard pages, UI-side API integration."
Backend & DevOps Engineer,"Authentication, Mock data service, Testing, CI/CD, Cloud deployment."


# Authorization Middleware Implementation

This project demonstrates **Role-Based Access Control (RBAC)** in a Next.js application using Middleware. It protects API routes by verifying JSON Web Tokens (JWT) and enforcing user roles (`admin` vs `user`) before requests reach the database.

## 🛡️ Middleware Logic Flow

The `middleware.ts` file acts as a security gatekeeper for the application.

1.  **Intercept:** Listens for requests to `/api/admin/*` and `/api/users/*`.
2.  **Authenticate:** Checks for the `Authorization: Bearer <token>` header.
3.  **Verify:** Decodes the JWT using `jose` (Edge-compatible library).
4.  **Authorize:**
    * **Admin Route:** Checks if `token.role === 'admin'`.
    * **User Route:** Allows any valid token.
5.  **Headers:** Injects `x-user-role` and `x-user-email` headers for the downstream route handlers to use.



## 🧪 Testing Role-Based Access

We tested the security using manual JWT generation and `curl` requests.

| Scenario | Route | Role Used | Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Happy Path** | `/api/admin` | `admin` | `Success: "Welcome Admin!"` | 🟢 200 OK |
| **Unauthorized** | `/api/admin` | `user` | `Error: "Access denied"` | 🔴 403 Forbidden |
| **Authenticated**| `/api/users` | `user` | `Success: User Data + Pagination` | 🟢 200 OK |
| **Unauthenticated**| `/api/users` | *(none)* | `Error: "Token missing"` | 🔴 401 Unauthorized |

## 🔒 Reflection on Security

### Principle of Least Privilege
By implementing authorization at the **Middleware level**, we ensure that unauthorized requests are rejected at the edge. A standard user request to an Admin route is blocked immediately, preventing the server from even wasting resources processing the database query. This minimizes the attack surface.

### Extensibility
The system is designed for growth. Adding a new role (e.g., `moderator`) is simple:
1.  Add `"moderator"` to the Prisma Schema Enum.
2.  Add a simple check in `middleware.ts`:
    ```typescript
    if (path.startsWith('/api/mod') && role !== 'moderator') return 403;
    ```

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Database:** PostgreSQL (via Prisma ORM)
* **Auth:** JWT (using `jose` library)
* **Styling:** Tailwind CSS


## 🚀 Caching Strategy
We use **Redis** to cache API responses and reduce database load.

### Architecture: Cache-Aside
1.  **Read (GET):** The API checks Redis first.
    * **Hit:** Returns cached JSON immediately (~10ms).
    * **Miss:** Queries PostgreSQL, updates Redis, and returns data (~150ms).
2.  **Write (POST):** When a new user is created, we invalidate (delete) the cache keys to ensure data consistency.

### Policies
* **TTL (Time-To-Live):** 60 seconds. This prevents the cache from holding stale data indefinitely if an invalidation fails.
* **Keys:** `users:page:${page}:limit:${limit}` (Dynamic keys to support pagination).

## 📧 Email Notification Service
Integrated a transactional email service using **Nodemailer** with Gmail SMTP.

### Features
* **Provider:** Gmail (via App Password).
* **Templating:** Modular HTML templates (`lib/templates/welcome.ts`) with responsive design.
* **Architecture:** Dedicated utility `sendEmail` function decoupled from the API route logic.

### API Endpoint
**POST** `/api/email`
```json
{
  "to": "user@example.com",
  "name": "John Doe"
}