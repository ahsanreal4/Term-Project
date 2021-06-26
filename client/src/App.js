import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import Register from "./components/auth/Register";
import AuthState from "./context/Auth/AuthState";
import Login from "./components/auth/Login";
//import setAuthToken from "./utils/setauthtoken";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

//if (localStorage.token) {
// setAuthToken(localStorage.token);
//}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
