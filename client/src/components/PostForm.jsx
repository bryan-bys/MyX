import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const PostForm = () => {
  const URL = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      <form className="post-form" onSubmit={onSubmit}>
        <div className="img-t">
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
        <div className="post-btn-container">
          <button
            disabled={errors.text === ""}
            onClick={() => setSendPost(true)}
            className="post-form-btn"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
