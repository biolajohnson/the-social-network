import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { name, _id, avatar },
    company,
    status,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="Avatar" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            {skill}
          </li>
        ))}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
