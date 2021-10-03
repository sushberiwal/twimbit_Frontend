import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Header = (props) => {
  let { isAuth, user } = props;
 
  const handleLogout = ()=>{
    props.logout();
    localStorage.removeItem("authToken");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Twim</Link>
          </Typography>
          {isAuth ? (
            <>
              <h4>Welcome {user.username}</h4>
              <Link to="/login">
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit">CREATE AN ACCOUNT</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (store) => {
  return store;
};

const mapDispatchToProps = (dispatch)=>{
  return {
    logout: ()=>{
      dispatch( {type:"LOGOUT"} )
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
