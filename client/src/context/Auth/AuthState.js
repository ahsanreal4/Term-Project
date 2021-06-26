import React, { useReducer } from "react";
import authContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setauthtoken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  //CLEAR_ERRORS,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  //Register User
  const register = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formdata, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.response.data.msg });
    }
  };

  //Set Alert
  const setAlert = () => {
    dispatch({ type: SET_ALERT });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
  //Login User
  const login = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formdata, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data.msg });
    }
  };
  //Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  //Clear Errors
  /*const clearErrors = () => {
    console.log("clearErrors");
  };*/
  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        setAlert,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
