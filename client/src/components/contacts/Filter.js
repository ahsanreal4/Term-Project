import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const Filter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filter } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (filter === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Filter;
