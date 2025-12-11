// JobCard.js
import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onDelete, onReminder }) => {
  return (
    <div className="job-card">
      <h3>{job.role}</h3>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Link:</strong>{' '}
        <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
          View Job
        </a>
      </p>
      <p>
        <strong>Applied:</strong> {job.applied ? 'Applied' : 'Not Applied'}
      </p>
      <div className="card-actions">
        <button onClick={() => onDelete(job._id)} className="delete-btn">
          Delete
        </button>
        {!job.applied && (
          <button
            onClick={() => onReminder(job)}
            className="reminder-btn"
          >
            Set Reminder
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;