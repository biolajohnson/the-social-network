import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment, deleteComment } from "../../actions/post";
import PropTypes from "prop-types";

const CommentForm = ({ postId, addComment, deleteComment }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text }, postId);
          setText("");
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment, deleteComment })(CommentForm);
