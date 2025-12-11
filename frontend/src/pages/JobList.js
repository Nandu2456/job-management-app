import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./JobList.css";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Jobs</h2>
      <div className="job-list">

      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
      </div>
    </div>
  );
};

export default JobsList;
