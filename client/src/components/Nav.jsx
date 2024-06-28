import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import PostBox from "./PostBox";

const Nav = () => {
  const [showPostForm, setShowPostForm] = useState(false);

  const handleLogOut = () => {
    const logOut = window.confirm("Do you want to log out ?");
    if (logOut) {
      localStorage.clear();
      window.location.reload();
    } else {
      return;
    }
  };

  const handlePost = () => {
    setShowPostForm(true);
  };

  return (
    <>
      {showPostForm ? <PostBox setShowPostForm={setShowPostForm} /> : null}
      <nav className="nav-container small">
        <div className="links-container">
          <NavLink to="/home">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </NavLink>
          <NavLink to="/profile">
            <i className="fa-regular fa-user"></i>
            <p>Profile</p>
          </NavLink>
          <NavLink>
            <i className="fa-regular fa-message"></i>
            <p>Messages</p>
          </NavLink>
          <button onClick={handlePost} className="post-btn" to="/post">
            <i className="fa-regular fa-paper-plane"></i>
            <>
              <p>Post</p>
            </>
          </button>
          <NavLink>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p onClick={handleLogOut}>Log out</p>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;
