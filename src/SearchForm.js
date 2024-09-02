/**
 * SearchForm Component
 * 
 * This component shows a form that allows users to input a search query
 * and generate a random vector of 1536 floating-point numbers. The form
 * submits a POST request to the server, sending the query and vector as 
 * payload. The results are then displayed below the form.
 */
import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {

  const [query, setQuery] = useState('');  // State to manage the search query input by the user
  const [vector, setVector] = useState([]);  // State to manage the vector, initially empty
  const [error, setError] = useState(null);  // State to manage any error messages that occur during the request
  const [results, setResults] = useState([]);  // State to manage the search results returned by the server
  const [loading, setLoading] = useState(false);  // State to manage the loading state of the request
  const [timeTaken, setTimeTaken] = useState(0);    // State to store the time taken by the server to process the request

  /**
   * generateRandomVector - Generates a random vector of 1536 floating-point numbers
   * and updates the vector state with generated vector.
   */
  const generateRandomVector = () => {
    const randomVector = Array.from({ length: 1536 }, () => Number(Math.random().toFixed(3)));
    setVector(randomVector);
  };

  /**
   * handleSubmit - Handles the form submission by sending the search query
   * and vector to the server. Manages loading state, errors, and results.
   *
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const numericVector = vector.map(Number);    // Ensure all elements in the vector are numbers
    const payload = { query, vector: numericVector };     // Prepare the payload to be sent in the POST request

    try {
      // Send a POST request to the server with the search query and vector
      // const response = await axios.post('http://localhost:3000/api/elastic-search', payload); // Use your API endpoint
      const response = await axios.post('https://hybrid-search-backend.vercel.app/api/elastic-search', payload); // Use your API endpoint
   
      // Update the state with the results and time taken
      setResults(response.data.results);
      setTimeTaken(response.data.timeTaken);
    } catch (error) {
      console.error('Error making search request:', error);
            
      // Handle different types of errors (response, request, or generic)
      if (error.response) {
        setError(error.response.data.error || 'An error occurred');
      } else if (error.request) {
        setError('No response from server');
      } else {
        setError('Request error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form to submit the search query and generate vector */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Search Query:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Vector:
            <textarea
              value={vector.join(', ')}
              readOnly
              rows="3"
              cols="40"
            />
          </label>
          <button type="button" onClick={generateRandomVector}>
            Generate Random Vector
          </button>
        </div>

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* List results */}
      {results.length === 0 && !loading && <strong>No results</strong>}
      {results.length > 0 && !loading && (
        <div>
          <p><strong>Time Taken:</strong> {timeTaken} ms</p>
          <h2>Search Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>ID:</strong> {result.id} <br />
                <strong>Title:</strong> {result.title} <br />
                <strong>Author:</strong> {result.author} <br />
                <strong>Content:</strong> {result.content.join(' ')} <br />
                <strong>Relevance:</strong> {result.relevance} <br />
                {/* <strong>time:</strong> {results.timeTaken} <br /> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;

