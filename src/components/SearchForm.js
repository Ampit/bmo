import React from "react";

const SearchForm = ({ handleSubmit, setSearchTerm, searchTerm }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="searchInput"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a book..."
        value={searchTerm}
      />
      <input type="submit" value="Search" className="submitBtn" />
    </form>
  );
};

export default SearchForm;
