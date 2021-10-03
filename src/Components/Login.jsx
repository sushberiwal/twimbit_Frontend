import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Alert } from "@mui/material";
import { connect } from "react-redux";


const Login = (props) => {
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    let result = await axios.post("api/user/login", userData);
    console.log(result);
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            Login
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


export default connect(null, mapDispatchToProps)(Login);
