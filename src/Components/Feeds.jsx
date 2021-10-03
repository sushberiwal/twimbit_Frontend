import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { Container } from "@mui/material";
import CreatePost from "./CreatePost";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("api/post/getall").then((data) => {
      if (data.data.data) {
        let updatedPosts = data.data.data;
        console.log(data.data.data);
        setPosts(updatedPosts);
      }
    });
    // setPosts(posts);
  }, []);

  const handleUpdatePost = (newPost) =>{
    let updatedPosts = [newPost ,...posts ];
    setPosts(updatedPosts);
  }

  return (
    <>
      <Container maxWidth="md">
        <CreatePost updatePosts={handleUpdatePost}></CreatePost>
        {posts.map((post) => {
          return <Post key={post._id} post={post}></Post>;
        })}
      </Container>
    </>
  );
};

export default Feeds;
