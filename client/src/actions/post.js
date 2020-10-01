import {
  GET_POST,
  POST_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POSTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//GET POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/likes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlikes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};

//add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/post`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//add post comment
export const addComment = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/post/comment/${id}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Deleted", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_ERROR,
      payload: { message: e.response.statusText, status: e.response.status },
    });
  }
};
