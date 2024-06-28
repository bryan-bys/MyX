import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Post from "./Post";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="main-container">
          <Nav />
          <main>
            <Post />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
