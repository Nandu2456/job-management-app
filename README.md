# job-management-app

Job Tracker with LinkedIn Integration

A full-stack Job Management System with a Chrome Extension that automates job tracking directly from LinkedIn.
The extension captures job details (title, company, link) and sends them to a backend API, where they are stored in a database and displayed on a web dashboard.

🚀 Features
🔹 1. Chrome Extension – Automated Job Capture

Extracts job information directly from LinkedIn job pages

Collects:

Job Title

Company Name

Job Link

Sends data to backend using secure REST API

One-click “Save Job” button inside LinkedIn

🔹 2. Backend API (Node.js + Express)

Stores job details in MongoDB

API endpoints for:

Add Job

Get all Jobs

Update Status (Applied, Interviewing, Rejected, Offer)

Delete Job

Handles validation and request/response formatting

🔹 3. Frontend Web Dashboard (React.js)

Displays all saved jobs in a clean UI

Filters jobs by status (Applied, Saved, Interviewing, Rejected)

Search and sort features

Real-time updates after adding jobs from extension

🏗️ Tech Stack
Component	Technology
Frontend	React.js, HTML, CSS
Backend	Node.js, Express.js
Database	MongoDB
Extension	Chrome Manifest v3, JavaScript
Tools	Git, GitHub, Postman

🔌 API Endpoints
POST /api/jobs/add

Add a job from the Chrome extension.

GET /api/jobs

Fetch all saved jobs.

PATCH /api/jobs/:id/status

Update job application status.

DELETE /api/jobs/:id

Remove a job entry.

🧩 How the Chrome Extension Works

User opens a LinkedIn job post

Extension script extracts:

Job title

Company

URL

Sends this data to the backend API

Data becomes visible on the frontend dashboard

🛠️ Installation Instructions
Clone the repository
git clone https://github.com/Nandu2456/job-management-app.git

▶️ Backend Setup
cd backend
npm install
npm start

▶️ Frontend Setup
cd frontend
npm install
npm start

🧩 Load Chrome Extension

Open Chrome → Extensions → Developer Mode

Click Load unpacked

Select the jobextension/ folder

🎯 Why This Project Matters

Automates tedious job tracking

Helps users avoid losing important job links

Provides a clear dashboard for job progress

Demonstrates skills in full-stack development, browser extensions, and REST APIs

👩‍💻 Author

Nandini Gourishetti
Backend & Full-Stack Developer

GitHub: https://github.com/Nandu2456

LinkedIn: https://www.linkedin.com/in/nandini-gourishetti-79a561239/

