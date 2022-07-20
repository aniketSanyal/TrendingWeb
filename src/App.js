import React, { useState } from "react";
import Dev from "./components/Dev";
import "./App.css";

function App() {
  const [developer, setDeveloper] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchDevHandler() {
    setIsLoading(true);
    setError(null);
    setIsFound(true);
    try {
      const response = await fetch("https://github-trending-api.de.a9sapp.eu/");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error Occured. Could not retrieve information");
      }

      const requiredFields = data.map((devData) => {
        return {
          name: devData.author,
          username: devData.username,
          avatar: devData.avatar,
          repo: {
            name: devData.name,
          },
          description: devData.description,
          url: devData.url,
        };
      });
      setDeveloper(requiredFields);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    setIsFound(developer.length === 0 ? false : true);
  }

  let returnMessage;

  if (error) returnMessage = <p>error</p>;

  if (isLoading) returnMessage = <p>Loading....</p>;

  if (!isFound && !isLoading) returnMessage = <p>Found no information</p>;

  if (developer.length > 0)
    returnMessage = <Dev search={searchTerm} developer={developer} />;

  let searchBar;
  if (developer.length > 0)
    searchBar = (
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        className="search-bar"
        type="text"
        placeholder="Search..."
      />
    );

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDevHandler}>Fetch Trending GitHub Repos</button>
      </section>
      <section>{searchBar}</section>
      <section>{returnMessage}</section>
    </React.Fragment>
  );
}

export default App;
