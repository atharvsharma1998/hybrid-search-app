// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchForm = () => {
//   const [query, setQuery] = useState('');
//   const [vector, setVector] = useState([]);
//   const [apiType, setApiType] = useState('normal-search');
//   const [error, setError] = useState(null); // State to store any errors
//   const [results, setResults] = useState([]); // State to store search results
//   const [loading, setLoading] = useState(false); // State to store loading status

//   const generateRandomVector = () => {
//     const randomVector = Array.from({ length: 1536 }, () => Number(Math.random().toFixed(3)));
//     setVector(randomVector);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear previous errors
//     setLoading(true); // Set loading to true before API call
//     const numericVector = vector.map(Number);
//     const payload = { query, numericVector };

//     try {
//       const response = await axios.post(`http://localhost:3000/api/${apiType}`, payload);
//       setResults(response.data); // Store results in state
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
//       setLoading(false); // Set loading to false after API call
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

//         <div>
//           <label>
//             API Type:
//             <select value={apiType} onChange={(e) => setApiType(e.target.value)}>
//               <option value="normal-search">Original API</option>
//               <option value="optimized-search">Optimized API</option>
//             </select>
//           </label>
//         </div>

//         <button type="submit">Search</button>
//       </form>

//       {loading && <p>Loading...</p>} {/* Show loading indicator */}

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {results.length === 0 && !loading && (
//         <div>
//           <h2>Search Results:</h2>
//           <strong>No results</strong> <br />
//         </div>
//       )}

//       {results.length > 0 && !loading && ( // Show results if not loading
//         <div>
//           <h2>Search Results:</h2>
//           <ul>
//             {results.map((result, index) => (
//               <li key={index}>
//                 <strong>ID:</strong> {result.id} <br />
//                 <strong>Title:</strong> {result.title} <br />
//                 <strong>Author:</strong> {result.author} <br />
//                 <strong>Content:</strong> {result.content} <br />
//                 <strong>Relevance:</strong> {result.relevance} <br />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default SearchForm;


import React, { useState } from 'react';
import axios from 'axios';
const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [vector, setVector] = useState([]);
  const [apiType, setApiType] = useState('normal-search');
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null); // State to store time taken

  const generateRandomVector = () => {
    const randomVector = Array.from({ length: 1536 }, () => Number(Math.random().toFixed(3)));
    setVector(randomVector);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const numericVector = vector.map(Number);
    const payload = { query, numericVector };

    try {
      const response = await axios.post(`http://localhost:3000/api/${apiType}`, payload);
      setResults(response.data.results);
      setTimeTaken(response.data.timeTaken); // Store time taken in state
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

        <div>
          <label>
            API Type:
            <select value={apiType} onChange={(e) => setApiType(e.target.value)}>
              <option value="normal-search">Original API</option>
              <option value="optimized-search">Optimized API</option>
            </select>
          </label>
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
                <strong>Content:</strong> {result.content} <br />
                <strong>Relevance:</strong> {result.relevance} <br />
              </li>
            ))}
          </ul>
          <p><strong>Time Taken:</strong> {timeTaken} ms</p> {/* Display time taken */}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
