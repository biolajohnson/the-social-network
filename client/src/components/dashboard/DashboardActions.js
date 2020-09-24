import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        Edit Profile
      </Link>
      <Link to="add-experience.html" className="btn btn-light">
        Add Experience
      </Link>
      <Link to="add-education.html" className="btn btn-light">
        Add Education
      </Link>
    </div>
  );
};
