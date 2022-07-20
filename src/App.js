import React, { useState } from "react";
import Dev from "./components/Dev";
import "./App.css";
import Filter from "./components/Filter";
import { motion, AnimatePresence } from "framer-motion";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function App() {
  const [developer, setDeveloper] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState("All");

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
          language: devData.language,
        };
      });
      setDeveloper(requiredFields);
      setFiltered(requiredFields);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    setIsFound(developer.length === 0 ? false : true);
  }

  let returnMessage;

  if (error) returnMessage = <p>error</p>;

  if (!isFound && !isLoading) returnMessage = <p>Found no information</p>;

  if (developer.length > 0)
    returnMessage = (
      <Dev
        search={searchTerm}
        developer={filtered}
        activeLanguage={activeLanguage}
      />
    );

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

  let filterBar;
  if (developer.length > 0)
    filterBar = (
      <Filter
        dev={developer}
        setFiltered={setFiltered}
        activeLanguage={activeLanguage}
        setActiveLanguage={setActiveLanguage}
      />
    );

  return (
    <React.Fragment>
      <section>
        {isFound && !isLoading && (
          <button className="start" onClick={fetchDevHandler}>
            Fetch Trending GitHub Repos
          </button>
        )}
      </section>
      {isLoading && (
        <div className="loader">
          <ClimbingBoxLoader size={20} color={"#76ba99"} loading={isLoading} />{" "}
        </div>
      )}

      <section>{searchBar}</section>
      <div>{filterBar}</div>
      <motion.div>
        <AnimatePresence>{returnMessage}</AnimatePresence>
      </motion.div>
    </React.Fragment>
  );
}

export default App;
