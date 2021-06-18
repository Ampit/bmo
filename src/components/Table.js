import React from "react";

const Table = ({ sortTitle, sortByDate, books, setBooks }) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th className="sortField" onClick={() => sortTitle(books, setBooks)}>
            Title
          </th>
          <th>Book Cover</th>
          <th>Author</th>
          <th className="sortField" onClick={() => sortByDate(books, setBooks)}>
            Publish Date
          </th>
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
  );
};

export default Table;
