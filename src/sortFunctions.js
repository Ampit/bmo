const sortTitle = (books, setBooks) => {
  const sorted = books.slice();
  sorted.sort((a, b) => {
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

const sortByDate = (books, setBooks) => {
  const sorted = books.slice();
  sorted.sort((a, b) => {
    if (!a.publish_date) return 1;
    if (!b.publish_date) return -1;
    if (!a.publish_date && !b.publish_date) return 1;
    const dateA = new Date(a.publish_date[0]); // ignore upper and lowercase
    const dateB = new Date(b.publish_date[0]); // ignore upper and lowercase
    if (dateA < dateB) {
      return -1; //nameA comes first
    }
    if (dateA > dateB) {
      return 1; // nameB comes first
    }
    return 0; // names must be equal
  });
  setBooks(sorted);
};

export { sortTitle, sortByDate };
