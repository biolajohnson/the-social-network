import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import { DashboardActions } from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../actions/profile";

const Dashboard = ({
  auth: { user },
  getCurrentProfile,
  profile: { loading, profile },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead"> Welcome {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <button onClick={deleteAccount} className="btn btn-danger">
            Delete Account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile yet. Please set it up here! </p>
          <Link to="/create-profile" className="btn btn-primary m-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(
  Dashboard
);
