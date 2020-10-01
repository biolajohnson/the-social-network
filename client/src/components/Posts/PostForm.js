import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import PropTypes from "prop-types";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="What do you have to say?"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
