import { useState } from "react";
import "./App.css";
import axios from "axios";

const SEARCH_URL = "http://openlibrary.org/search.json?q=";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch data from api and populate results
    const { data } = await axios.get(SEARCH_URL + searchTerm);
    setData(data);
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
    </div>
  );
}

export default App;
