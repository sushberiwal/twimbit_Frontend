import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid, Modal, Divider, Paper, TextField } from "@mui/material";
import { connect } from "react-redux";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Post = (props) => {
  console.log(props);
  let [postUser, setPostUser] = useState(null);
  let [isLiked, setIsLiked] = useState(false);
  let [likesCount, setLikesCount] = useState(0);
  let [commentsCount , setCommentsCount] = useState(0);
  let [commentList, setCommentList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [commentText, setCommentText] = useState("");
  const handleOnChange = (e) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  let post = props.post;

  useEffect(() => {
    axios.get(`api/user/get/${post.createdBy}`).then((response) => {
      let user = response.data.username;
      setPostUser(user);
      setLikesCount(post.likes.length);
      setCommentList(post.comments)
      setCommentsCount(post.comments.length);
      if (post.likes.includes(props.user._id)) {
        setIsLiked(true);
      }
    });
  }, []);

  const handleLikes = async(value) => {
    setIsLiked(value);
    if (value == true) {
      let updatedLikesCount = likesCount + 1;
      console.log(updatedLikesCount);
      setLikesCount(updatedLikesCount);
      // yahan pr add karna h likeId
      await axios.post("api/action/like" , {postId:post._id , userId:props.user._id});
    } else {
      let updatedLikesCount = likesCount - 1;
      console.log(updatedLikesCount);
      setLikesCount(updatedLikesCount);
      // yahan pr remove karna h likeId
      await axios.post("api/action/unlike" , {postId:post._id , userId:props.user._id});
    }
  };

  const addComment = async(e)=>{
      e.preventDefault();
      if(e.key == "Enter"){
          await axios.post("/api/action/comment", {username:props.user.username , comment:commentText , postId:post._id});
          let updatedCommentList = [...commentList , {username:props.user.username , comment:commentText }];
          setCommentList(updatedCommentList);
          let updatedCommentCount = commentsCount+1;
          setCommentsCount(updatedCommentCount);
          setCommentText("");
      }

  }

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="p">{postUser}</Typography>
        <Typography variant="h3">{post.text}</Typography>
      </CardContent>
      <CardActions>
        {isLiked ? (
          <Button variant="contained" onClick={() => handleLikes(false)}>
            {likesCount} Likes
          </Button>
        ) : (
          <Button variant="text" onClick={() => handleLikes(true)}>
            {likesCount} Likes
          </Button>
        )}
        <Button variant="text" onClick={handleOpen}>
         {commentsCount} Comments
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ padding: 14 }} className="App">
              <h1>Comments</h1>
              <Paper style={{ padding: "40px 20px" }}>
                {commentList.map((commentObj) => {
                  return (
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                          {commentObj.username}
                        </h4>
                        <p style={{ marginTop:2 ,textAlign: "left" , fontSize:"20px" }}>
                          {commentObj.comment}
                        </p>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        style={{ margin: "30px 0" }}
                      />
                    </Grid>
                  );
                })}
                <TextField
                  fullWidth
                  label="New post comment here..."
                  id="fullWidth"
                  value={commentText}
                  onChange={handleOnChange}
                  onKeyUp={addComment}
                />
              </Paper>
            </div>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (store) => {
  return store;
};

export default connect(mapStateToProps, null)(Post);
