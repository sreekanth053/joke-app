import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';

const Homepage = () => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track user's login status
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to fetch jokes
  const fetchJokes = async () => {
    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jokes");
      }
      const data = await response.json();
      setJokes(data.jokes);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // Variable to track if component is still mounted

    // Fetch jokes only if the component is still mounted
    if (isMounted) {
      fetchJokes();
    }

    // Cleanup function to unfetch jokes when the component unmounts
    return () => {
      isMounted = false; // Set isMounted to false when component unmounts
      setJokes([]);
    };
  }, []);

  // Function to handle fetching new jokes
  const fetchNewJokes = () => {
    setIsLoading(true);
    fetchJokes();
  };

  // Function to handle logging out
  const handleLogout = () => {
    // Perform logout actions here
    setIsLoggedIn(false); // Update isLoggedIn state to false
    navigate("/"); // Use navigate to redirect to the login page
  };

  // Redirect to login page if user is not logged in
  if (!isLoggedIn) {
    navigate("/");
    return null; // Return null to prevent rendering of HomePage content
  }

  return (
    <div className="table-container mt-5">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <>
          <table className="table" style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
            <thead>
              <tr>
                <th className="column-name" style={{ border: "1px solid #ddd",textAlign:"start", padding: "8px" }}>Jokes</th>
              </tr>
            </thead>
            <tbody>
              {jokes.map((joke, index) => (
                <tr key={index}>
                  <td className="row-name" style={{ border: "1px solid #ddd", padding: "8px" }}>{joke.joke}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="button-primary" onClick={fetchNewJokes}>Fetch Jokes</button>
            <button className="button-danger" onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
