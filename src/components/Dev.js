import React from "react";
import DevList from "./DevList";
import classes from "./Dev.module.css";

const Dev = (props) => {
  return (
    <ul className={classes["dev-list"]}>
      {props.developer
        .filter((data) => {
          if (props.search === "") {
            return data;
          } else if (
            data.name.toLowerCase().startsWith(props.search.toLowerCase())
          ) {
            return data;
          } else if (
            data.name.toLowerCase().includes(props.search.toLowerCase())
          ) {
            return data;
          } else return null;
        })
        .map((dev) => (
          <DevList
            name={dev.name}
            username={dev.username}
            description={dev.description}
            repo_name={dev.repo.name}
            url={dev.url}
          />
        ))}
    </ul>
  );
};

export default Dev;
