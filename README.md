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


<!-- npx prisma migrate dev --name init -->
