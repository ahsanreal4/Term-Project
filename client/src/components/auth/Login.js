import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/authContext";
import { useAlert } from "react-alert";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const alert = useAlert();
  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated } = authContext;
  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      alert.show("Invalid Credentials");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
