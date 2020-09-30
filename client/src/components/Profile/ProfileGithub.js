import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../Layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">GitHub Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div className="repo bg-white my-1 p-1" key={repo._id}>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li key={"stars"} className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li key={"watchers"} className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li key={"forks"} className="badge badge-light">
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
