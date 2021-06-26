import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/authContext";
import { useAlert } from "react-alert";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const alert = useAlert();
  const authContext = useContext(AuthContext);
  const { register, setAlert, loading, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User Already Exists") {
      alert.show("User already Exists");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      register({ name, email, password });
    } else {
      loading && alert.show("Passwords Must Match");
      loading && setAlert();
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
