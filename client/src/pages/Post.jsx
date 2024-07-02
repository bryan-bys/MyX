import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "../components/PostForm";
import Comments from "../components/Comments";

const Post = () => {
  const URL = import.meta.env.VITE_API_URL;

  const [posts, setPosts] = useState();
  const [headers, setHeaders] = useState({
    Authorization: `Token ${localStorage.getItem("token")}`,
  });
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    setLikes(false);
    if (!posts) {
      axios
        .get(`${URL}/api/post/`, {
          headers: headers,
        })
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [likes]);

  const handleLike = (data) => {
    axios
      .post(
        `${URL}/api/like/${data}/`,
        {},
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
    setLikes(true);
  };

  return (
    <>
      <PostForm headers={headers} />
      <div className="post-container">
        {posts
          ? posts.map((data) => (
              <div className="post" key={data.id}>
                {!localStorage.getItem("img") ? (
                  <div className="img-profile">
                    <i className="fa-regular fa-user"></i>
                  </div>
                ) : (
                  <div className="img-profile">
                    <img src={data.user_image} />
                  </div>
                )}
                <div className="post-content">
                  <div className="name-and-time">
                    <h3 className="name-post">{data.user}</h3>
                    <i className="timestamp">{data.timestamp} ago</i>
                  </div>

                  <p>{data.content}</p>
                  <div className="btns-from-post">
                    <button
                      className={
                        data.likes.includes(localStorage.getItem("username"))
                          ? "like-btn activate"
                          : "like-btn"
                      }
                      onClick={() => {
                        handleLike(data.id);
                      }}
                    >
                      <i className="fa-regular fa-heart"></i>
                      <p>{data.likes.length}</p>
                    </button>
                    {/* <button
                      onClick={() => {
                        setShowComment(true);
                      }}
                      className="comment-btn"
                    >
                      <i className="fa-regular fa-comment"></i>
                    </button> */}
                    <Comments
                      showComment={showComment}
                      setShowComment={setShowComment}
                      postId={data.id}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Post;
