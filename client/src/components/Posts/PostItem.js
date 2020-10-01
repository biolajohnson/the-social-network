import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { text, avatar, name, user, likes, comments, date, _id },
  showActions,
  addLike,
  removeLike,
  deletePost,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY"></Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <ion-icon name="thumbs-up"></ion-icon>{" "}
              <span>{likes.length > 0 && <span> {likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <ion-icon name="thumbs-down"></ion-icon>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && <span> {comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                onClick={() => deletePost(_id)}
                className="btn btn-danger"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
