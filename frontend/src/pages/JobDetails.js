import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Job deleted!");
        navigate("/jobs");
      })
      .catch((err) => console.error(err));
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.role}</h2>
      <p>Company: {job.companyName}</p>
      <p>Description: {job.jobDescription}</p>
      <p>Applied: {job.applied ? "✅ Yes" : "❌ No"}</p>
      <a href={job.jobLink} target="_blank" rel="noreferrer">
        View on LinkedIn
      </a>
      <br />
      <button onClick={handleDelete}>Delete Job</button>
    </div>
  );
};

export default JobDetails;
