import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ changeSearch, searchContact }) => {
  return (
    <div className="search-form">
      <input
        type="text"
        value={searchContact}
        placeholder="Search"
        onChange={(e) => changeSearch(e.target.value)}
        aria-label="search"
      />
    </div>
  );
};

export default SearchForm;
