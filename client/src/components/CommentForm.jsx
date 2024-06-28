import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export const CommentForm = ({ headers, postId, setSendComment }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/comment/",
        {
          user: localStorage.getItem("id"),
          content: data.text,
          post: postId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSendComment(true);
  });

  return (
    <>
      <div className="comment-form">
        <form id="comment-form" name="form" onSubmit={onSubmit}>
          {!localStorage.getItem("img") ? (
            <div className="img-profile comment">
              <i className="fa-regular fa-user"></i>
            </div>
          ) : (
            <div className="img-profile comment">
              <img src={localStorage.getItem("img")} />
            </div>
          )}
          <textarea
            rows="3"
            {...register(`text`, { required: true })}
            placeholder="Post your comment"
          ></textarea>
          <button>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
};
