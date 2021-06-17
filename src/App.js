import { useState } from "react";
import "./App.css";
import axios from "axios";

const SEARCH_URL = "http://openlibrary.org/search.json?q=";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(false);
  const [numBooks, setNumBooks] = useState(0);
  const [books, setBooks] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch data from api and populate results
    try {
      const { data } = await axios.get(SEARCH_URL + searchTerm);
      setNumBooks(data.numFound);
      setFetching(true);
      const numPages = Math.ceil(data.numFound / 100);
      const requests = [];
      let books = data.docs;
      setBooks(books);
      // create all requests.
      for (let i = 2; i <= numPages; i++) {
        requests.push(axios.get(SEARCH_URL + searchTerm + "&page=" + i));
      }
      // concurrent requests
      await Promise.all(requests).then((results) => {
        results.forEach((result) => books.push(...result.data.docs));
      });
      setBooks(books);
      console.log(books);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sortTitle = () => {
    console.log("clicked");
    let sorted = books.sort((a, b) => {
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
    setBooks(sorted);
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
      {fetching && (
        <div className="fetching">Fetching all {numBooks} books...</div>
      )}
      <table className="table">
        <tbody>
          <tr>
            <th onClick={sortTitle}>Title</th>
            <th>Book Cover</th>
            <th>Author</th>
            <th>Publish Date</th>
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
    </div>
  );
}

export default App;
