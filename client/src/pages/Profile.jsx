import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Comments from "../components/Comments";
import Post from "./Post";
import PostForm from "../components/PostForm";
import ProfileInformation from "../components/ProfileInformation";

const Profile = () => {
  const URL = import.meta.env.VITE_API_URL;

  const [userPosts, setUserPosts] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(false);
  const [headers, setHeaders] = useState({
    Authorization: `Token ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    setLikes(false);
    axios
      .get(`${URL}/api/posts/user_posts/`, {
        headers: headers,
      })
      .then((res) => {
        setUserPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      .then((res) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setLikes(true);
  };

  return (
    <>
      <div className="main-container">
        <Nav />
        <main>
          <ProfileInformation userPosts={userPosts} />
          <div className="post-container">
            {userPosts
              ? userPosts.map((data) => (
                  <div className="post" key={data.id}>
                    {!localStorage.getItem("img") ? (
                      <div className="img-profile">
                        <i className="fa-regular fa-user"></i>
                      </div>
                    ) : (
                      <img
                        className="img-profile"
                        src={localStorage.getItem("img")}
                      />
                    )}
                    <div className="post-content">
                      <h3 className="name-post">
                        {localStorage.getItem("username")}
                      </h3>
                      <p>{data.content}</p>
                      <div className="btns-from-post">
                        <button
                          className={
                            data.likes.includes(
                              localStorage.getItem("username")
                            )
                              ? "like-btn activate"
                              : "like-btn"
                          }
                          onClick={() => {
                            handleLike(data.id);
                          }}
                        >
                          <i className="fa-regular fa-heart"></i>
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
        </main>
      </div>
    </>
  );
};

export default Profile;
