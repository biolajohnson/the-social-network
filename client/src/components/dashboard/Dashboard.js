import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";

const Dashboard = ({
  auth: { user },
  getCurrentProfile,
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large"> Welcome {user && user.name}</h1>
          {profile !== null ? (
            <Fragment>has</Fragment>
          ) : (
            <Fragment>
              <p>You have not setup a profile yet. Please set it up here! </p>
              <Link to="/create-profile" className="btn btn-primary m-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
