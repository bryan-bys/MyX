import React from "react";

const ProfileInformation = ({ userPosts }) => {
  return (
    <>
      <div className="profile-information-container">
        <div className="profile-img-name">
          {!localStorage.getItem("img") ? (
            <div className="img-profile">
              <i className="fa-regular fa-user"></i>
            </div>
          ) : (
            <div className="img-profile">
              <img src={localStorage.getItem("img")} />
            </div>
          )}
          <h2 className="name-profile">{localStorage.getItem("username")}</h2>
        </div>

        <div className="follows-container">
          <div className="your-post">
            <p>{userPosts.length}</p>
            <p>post</p>
          </div>
          <div className="followers">
            <p>100</p>
            <p>followers</p>
          </div>
          <div className="following">
            <p>100</p>
            <p>following</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
