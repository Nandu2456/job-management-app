import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./Home.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch jobs:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Job deleted!");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleReminder = (job) => {
    const title = encodeURIComponent(`Reminder to Apply: ${job.role} at ${job.companyName}`);
    const details = encodeURIComponent(`Apply to this job:\n${job.jobLink}`);
    const startDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "")
      .slice(0, 15);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${startDate}`;

    window.open(calendarUrl, "_blank");
  };

  return (
    <div className="home-container">
      <h1>📋 My Job Applications</h1>
      <div className="job-grid">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onReminder={handleReminder}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
