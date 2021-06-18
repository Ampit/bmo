import { useState } from "react";
import "./App.css";
import axios from "axios";

const SEARCH_URL = "http://openlibrary.org/search.json?q=";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(false);
  const [numBooks, setNumBooks] = useState(0);
  const [numPages, setNumPages] = useState(0);
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

  const sortTitle = () => {
    const booksToSort = books.slice();
    booksToSort.sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1; //nameA comes first
      }
      if (nameA > nameB) {
        return 1; // nameB comes first
      }
      return 0; // names must be equal
    });
    setBooks(booksToSort);
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
    for (let i = 2; i <= numPages; i++) {
      pages.push(SEARCH_URL + searchTerm + "&page=" + i);
    }
    return (
      <>
        <h5 className="navPageTitle">Pages</h5>
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
                {index + 2}
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
      {/* Show Results in a table here (Title, Book Cover, Author, Publish Date) */}
      {fetching && <div className="fetching">Fetching...</div>}
      {numBooks && <div className="booksNumber">{numBooks} Books Found.</div>}
      <table className="table">
        <tbody>
          <tr>
            <th className="sortField" onClick={() => sortTitle()}>
              Title
            </th>
            <th>Book Cover</th>
            <th>Author</th>
            <th className="sortField">Publish Date</th>
          </tr>
          {books &&
            books.map((row, index) => (
              <tr key={row._version_ + index + Math.floor(Math.random() * 100)}>
                <td>{row.title}</td>
                {row.isbn && (
                  <td>
                    <img
                      alt={row.title}
                      src={
                        "http://covers.openlibrary.org/b/isbn/" +
                        row.isbn[0] +
                        "-S.jpg"
                      }
                    />
                  </td>
                )}
                {!row.isbn && <td>---</td>}
                {row.author_name && <td>{row.author_name[0]}</td>}
                {!row.author_name && <td>---</td>}
                {row.publish_date && <td>{row.publish_date[0]}</td>}
                {!row.publish_date && <td>---</td>}
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination */}
      {pagination()}
    </div>
  );
}

export default App;
