import React, { useState } from "react";
// import "./App.css";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import Table from "./components/Table";
import { sortTitle, sortByDate } from "./sortFunctions";

const SEARCH_URL = "https://openlibrary.org/search.json?q=";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(false);
  const [numBooks, setNumBooks] = useState();
  const [numPages, setNumPages] = useState();
  const [books, setBooks] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    try {
      const { data } = await axios.get(SEARCH_URL + searchTerm);
      setNumBooks(data.numFound);
      setNumPages(Math.ceil(data.numFound / 100));
      setBooks(data.docs);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePage = async (page) => {
    setFetching(true);
    try {
      const { data } = await axios.get(page);
      setBooks(data.docs);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const pagination = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(SEARCH_URL + searchTerm + "&page=" + i);
    }
    return (
      <>
        {numPages && <h5 className="navPageTitle">Pages</h5>}
        <ul className="tableNav">
          {pages.map((page, index) => (
            <li>
              <button
                className="tableBtn"
                onClick={() => {
                  updatePage(page);
                  window.scrollTo(0, 0);
                }}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="App">
      <h1>Book Search App</h1>
      <SearchForm
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
      />
      {fetching && <div className="fetching">Fetching...</div>}
      {numBooks && <div className="booksNumber">{numBooks} Books Found.</div>}
      <p className="sortText">
        Click on Title or Publish Date Header to sort the rows
      </p>
      <Table
        setBooks={setBooks}
        sortTitle={sortTitle}
        sortByDate={sortByDate}
        books={books}
      />
      {pagination()}
    </div>
  );
}

export default App;
