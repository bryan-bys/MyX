import { useState, useEffect } from "react";
import axios from "axios";
import { CommentForm } from "./CommentForm";

const Comments = ({ postId }) => {
  const URL = import.meta.env.VITE_API_URL;

  const [headers, setHeaders] = useState({
    Authorization: `Token ${localStorage.getItem("token")}`,
  });
  const [comments, setComments] = useState([]);
  const [commentActive, setCommentActive] = useState(false);
  const [commentsLength, setCommentsLength] = useState([]);
  const [sendComment, setSendComment] = useState(false);
  useEffect(() => {
    setSendComment(false);
    axios
      .get(`https://myx-ttm2.onrender.com/api/posts/${postId}/comments/`, {
        headers: headers,
      })
      .then((res) => {
        setComments(res.data);
        setCommentsLength(res.data.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [sendComment]);

  return (
    <>
      <button
        className="comment-btn"
        onClick={() => {
          setCommentActive(true);
        }}
      >
        <i className="fa-regular fa-comment"></i>
        <p>{commentsLength}</p>
      </button>
      {commentActive ? (
        <div
          onClick={() => {
            setCommentActive(false);
          }}
          className="comment-background"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="comments-container"
          >
            <div className="comments">
              <button
                onClick={() => {
                  setCommentActive(false);
                }}
                className="close-comment"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {comments.map((data) => (
                <div className="comment-user" key={data.id}>
                  {!localStorage.getItem("img") ? (
                    <div className="img-profile">
                      <i className="fa-regular fa-user"></i>
                    </div>
                  ) : (
                    <div className="img-profile">
                      <img src={data.user_image} />
                    </div>
                  )}
                  <div className="comment-content">
                    <h3 className="name-post">{data.user}</h3>
                    <p>{data.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <CommentForm
              setSendComment={setSendComment}
              headers={headers}
              postId={postId}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Comments;
