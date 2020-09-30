import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    location,
    company,
    social,
    website,
    user: { avatar, name },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>{company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer"></a>
        )}
        {social && social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
        {social && social.instagram && (
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
        {social && social.facebook && (
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
        {social && social.linkedIn && (
          <a
            href={social.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
        {social && social.youtube && (
          <a
            href={social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
