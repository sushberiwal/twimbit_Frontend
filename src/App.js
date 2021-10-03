import "./App.css";
import React from "react";
import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Feeds}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
