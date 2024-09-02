
import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [vector, setVector] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [timeTaken, setTimeTaken] = useState(null);

  const generateRandomVector = () => {
    const randomVector = Array.from({ length: 1536 }, () => Number(Math.random().toFixed(3)));
    setVector(randomVector);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const numericVector = vector.map(Number);
    const payload = { query, vector: numericVector };

    try {
      const response = await axios.post('http://localhost:3000/api/elastic-search', payload); // Use your API endpoint
      setResults(response.data.results);
      // setTimeTaken(response.data.timeTaken);
    } catch (error) {
      console.error('Error making search request:', error);
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

      {results.length === 0 && !loading && <strong>No results</strong>}
      {results.length > 0 && !loading && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>ID:</strong> {result.id} <br />
                <strong>Title:</strong> {result.title} <br />
                <strong>Author:</strong> {result.author} <br />
                <strong>Content:</strong> {result.content.join(' ')} <br />
                <strong>Relevance:</strong> {result.relevance} <br />
                <strong>time:</strong> {results.timeTaken} <br />
              </li>
            ))}
          </ul>
          <p><strong>Time Taken:</strong>  ms</p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchForm = () => {
//   const [query, setQuery] = useState('');
//   const [vector, setVector] = useState([]);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [timeTaken, setTimeTaken] = useState(null);

//   const generateRandomVector = () => {
//     const randomVector = Array.from({ length: 1536 }, () => Number(Math.random().toFixed(3)));
//     setVector(randomVector);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (vector.length === 0) {
//       setError('Please generate a vector before submitting the search.');
//       return;
//     }

//     setError(null);
//     setLoading(true);
//     const numericVector = vector.map(Number);
//     const payload = { query, vector: numericVector };

//     try {
//       const response = await axios.post('http://localhost:3000/api/elastic-search', payload); // Use your API endpoint
//       setResults(response.data.results);
//       setTimeTaken(response.data.timeTaken);
//     } catch (error) {
//       console.error('Error making search request:', error);
//       if (error.response) {
//         setError(error.response.data.error || 'An error occurred');
//       } else if (error.request) {
//         setError('No response from server');
//       } else {
//         setError('Request error: ' + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Search Query:
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Vector:
//             <textarea
//               value={vector.join(', ')}
//               readOnly
//               rows="3"
//               cols="40"
//             />
//           </label>
//           <button type="button" onClick={generateRandomVector}>
//             Generate Random Vector
//           </button>
//         </div>

//         <button type="submit" disabled={vector.length === 0}>
//           Search
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {results.length === 0 && !loading && <strong>No results</strong>}
//       {results.length > 0 && !loading && (
//         <div>
//           <h2>Search Results:</h2>
//           <ul>
//             {results.map((result, index) => (
//               <li key={index}>
//                 <strong>ID:</strong> {result.id} <br />
//                 <strong>Title:</strong> {result.title} <br />
//                 <strong>Author:</strong> {result.author} <br />
//                 <strong>Content:</strong> {result.content.join(' ')} <br />
//                 <strong>Relevance:</strong> {result.relevance} <br />
//               </li>
//             ))}
//           </ul>
//           <p><strong>Time Taken:</strong> {timeTaken} ms</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchForm;



