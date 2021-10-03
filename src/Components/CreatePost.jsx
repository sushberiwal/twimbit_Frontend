import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { connect } from "react-redux";

const CreatePost = (props) => {
  const [postText, setPostText] = useState("");

  const handlePublishPost = async () => {
    let createdBy = props.user._id;
    let response = await axios.post("api/post/create" , {text:postText , createdBy});
    let createdPost = response.data.data;
    props.updatePosts(createdPost);
    setPostText("");
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setPostText(e.target.value);
  };

  return (
    <>
      {props.isAuth && (
        <Box sx={{ marginTop: 5 }}>
          <React.Fragment>
            <CardContent>
              <TextField
                fullWidth
                label="New post title here..."
                id="fullWidth"
                value={postText}
                onChange={handleOnChange}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                disabled={postText ? false : true}
                onClick={handlePublishPost}
              >
                Publish
              </Button>
            </CardActions>
          </React.Fragment>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (store) => {
  return store;
};

export default connect(mapStateToProps, null)(CreatePost);
