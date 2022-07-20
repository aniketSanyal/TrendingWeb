import React from "react";
import classes from "./DevList.module.css";

const DevList = (props) => {
  return (
    <li className={classes.devlist}>
      <h2> {props.name} </h2>
      <h3> {props.username}</h3>
      <h3>{props.repo_name}</h3>
      <p>{props.description}</p>
      <a href={props.url}>Url</a>
    </li>
  );
};

export default DevList;
