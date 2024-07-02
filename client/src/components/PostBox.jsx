import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const PostBox = ({ setShowPostForm }) => {
  const URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm();
  const [headers, setHeaders] = useState({
    Authorization: `Token ${localStorage.getItem("token")}`,
  });
  const [sendPost, setSendPost] = useState(false);

  const onSubmit = handleSubmit((data) => {
    axios
      .post(
        `https://myx-ttm2.onrender.com/api/post/`,
        {
          user: localStorage.getItem("id"),
          content: data.text,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  useEffect(() => {
    sendPost ? window.location.reload() : null;
    setSendPost(false);
  }, [sendPost]);

  return (
    <>
      <div
        onClick={() => {
          setShowPostForm(false);
        }}
        className="post-box-background"
      >
        <form
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="post-form-box"
          onSubmit={onSubmit}
        >
          <button
            onClick={() => {
              setShowPostForm(false);
            }}
            className="close-post-box"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="img-t-box">
            {!localStorage.getItem("img") ? (
              <div className="img-profile">
                <i className="fa-regular fa-user"></i>
              </div>
            ) : (
              <div className="img-profile">
                <img src={localStorage.getItem("img")} />
              </div>
            )}
            <textarea
              placeholder="What is happening ?"
              rows="3"
              {...register(`text`, { required: true })}
            ></textarea>
          </div>
          <div className="post-btn-container box">
            <button onClick={() => setSendPost(true)} className="post-form-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostBox;
