import React, { useState, useEffect } from 'react';
import './App.css';

const PAGE_SIZE = 10;

function App() {

  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('the lord of the rings');
  const [page, setPage] = useState(0);

  function getURL() {
    // This function is for generating the API's URL based on the state.
    // Create an array of all the principle parts of the URL, and then join the
    // array together. This style of creating the string is just to make the
    // function more legible, instead of being 1 super long line.
    return [
      'http://openlibrary.org/search.json?q=',
      query.replace(/\W+/g, '+'),
      '&limit=',
      PAGE_SIZE,
      '&offset=',
      PAGE_SIZE * (page || 0),
    ].join('');
  }

  /*
    doFetch will do the fetch to the API based on state, updating the state with
    the books retrieved.
  */
  function doFetch() {
    const url = getURL();
    console.log('making query to ', url);
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Calculate the total pages, based on the page size and the number of
        // results
        setTotalPages(Math.ceil(data.numFound / PAGE_SIZE));
        console.log('data', data);

        // Set the state of the new information, notably the total number of
        // pages, and the array of data we got back
        setBooks(data.docs);
        setIsLoading(false);
      });
  }

  /*
    onSearch is called when the Search button is clicked
  */
  function onSearch() {
    if (page === 0) {
      // No need to reset the page, so lets just do the fetch
      doFetch();
    } else {
      // Reset the page to 0, which will in turn cause a fetch
      setPage(0);
    }
  }

  function onQueryChange(ev) {
    setQuery(ev.target.value);
  }

  function decrementPage() {
    if (page <= 0) {
      return; // don't do anything
    }
    setPage(page - 1);
  }

  function incrementPage() {
    if (page >= totalPages) {
      return; // don't do anything
    }
    setPage(page + 1);
  }

  // This will cause data to be fetched 1) when we first load, and 2) any time
  // the page variable gets changed
  useEffect(doFetch, [page]);

  return (
    <div className="App">
      <div className="SearchBox">
        <input
          placeholder="Type a book title..."
          onChange={onQueryChange}
          value={query}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div className="Paginator">
        <button onClick={decrementPage}>&larr;</button>
        <span>{page + 1} / {totalPages + 1}</span>
        <button onClick={incrementPage}>&rarr;</button>
      </div>
      <div className="Books">
        {isLoading ?  (
          <div className="loader">Loading...</div>
        ) : books.map(book => (
          <div className="Books-book" key={book.key}>
            {/* ^- The "book.key" is a unique ID we'll use as the key for this map */}
            <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="cover" />
            <div className="Books-book-details">
              <div className="Books-book-title">{book.title_suggest}</div>
              <strong>Author:</strong> {(book.author_name || []).join(',')}<br />
              <strong>Language:</strong> {(book.language || []).join(',')}<br />
              <strong>Year Published:</strong> {book.first_publish_year}<br />
              <strong>Publisher(s):</strong> {(book.publisher || []).join(',')}<br />
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
