import React, { useState } from "react";

const SortContacts = ({ filtered, addContactToState }) => {
  const [sort, setSort] = useState(false);

  //Sort Contacts List A-Z, Z-A
  const sortContacts = () => {
    let sorted = [];
    setSort(!sort);

    if (!sort) {
      sorted = [...filtered].sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      addContactToState(sorted);
    } else {
      sorted = [...filtered].sort((b, a) =>
        b.name < a.name ? 1 : a.name < b.name ? -1 : 0
      );
      addContactToState(sorted);
    }
  };

  return (
    <div
      className="btn-filter"
      onClick={() => {
        sortContacts();
      }}
    />
  );
};

export default SortContacts;
