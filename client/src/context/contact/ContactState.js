import React, { useReducer } from "react";

import contactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  FILTER_DELETE,
  CONTACT_ERRORS,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filter: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERRORS });
    }
  };

  //ADD CONTACT
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERRORS, payload: error.response.msg });
    }
  };

  //DELETE CONTACT
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERRORS, payload: error.response.msg });
    }
  };
  //SET CURRENT CONTACT
  const SetCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //CLEAR CURRENT CONTACT
  const ClearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //UPDATE CONTACT
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERRORS, payload: error.response.msg });
    }
  };
  //FILTER CONTACTS
  const filterContacts = (name) => {
    dispatch({ type: FILTER_CONTACTS, payload: name });
  };
  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const filterDelete = (id) => {
    dispatch({ type: FILTER_DELETE, payload: id });
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        error: state.error,
        addContact,
        deleteContact,
        SetCurrentContact,
        ClearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        filterDelete,
        getContact,
        clearContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
