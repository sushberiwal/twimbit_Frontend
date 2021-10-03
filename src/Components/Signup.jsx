import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Alert } from "@mui/material";
import {connect} from "react-redux";

const Signup = (props) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {
      name: data.get("name"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    let result = await axios.post("api/user/create", userData);
    if (result.data.error) {
      setError(result.data.error);
      return;
    }
    let token = result.data.token;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user" , JSON.stringify(result.data.user));
    props.login(result.data.user);
    props.history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userData)=>{ dispatch({type:"LOGIN" , payload:userData})  } 
  }
};

export default connect(null, mapDispatchToProps)(Signup);
