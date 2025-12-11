import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import JobsList from "../pages/JobList";
import JobDetails from "../pages/JobDetails";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobsList />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      
    </Routes>
  );
};

export default AppRoutes;
