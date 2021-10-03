import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Divider , Grid, Paper } from "@material-ui/core";

const Comments = (props) => {
  // {comment , username};

  const [commentText , setCommentText] = useState("");
  const handleOnChange = (e) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          {props.map((commentObj) => {
            return (
              <>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {commentObj.username}
                  </h4>
                  <p style={{ textAlign: "left" }}>
                   {commentObj.comment}
                  </p>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              </>
            );
          })}
        </Grid>
        <TextField
                fullWidth
                label="New post comment here..."
                id="fullWidth"
                value={commentText}
                onChange={handleOnChange}
              />
      </Paper>
    </div>
  );
};

export default Comments;
