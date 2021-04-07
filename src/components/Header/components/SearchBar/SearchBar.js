import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(term);
  };
  return (
    <form onSubmit={handleFormSubmit} className="ui form customForm">
      <div className="field search-container">
        <input
          placeholder="Cerca"
          type="text"
          value={term}
          onChange={onInputChange}
        />
        <button className="search-button" onClick={handleFormSubmit}>
          <i className="search icon fitted"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
