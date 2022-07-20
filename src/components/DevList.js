import React from "react";
import classes from "./DevList.module.css";
import { motion } from "framer-motion";

const DevList = (props) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className={classes.devlist}
    >
      <h2> {props.name} </h2>
      <h3> {props.username}</h3>
      <h3>{props.repo_name}</h3>
      <p>
        {props.activeLanguage === "All"
          ? props.description.length > 106
            ? props.description.substring(0, 106).concat("...")
            : props.description
          : props.description}
      </p>

      <a className={classes.link} href={props.url}>
        Link
      </a>
    </motion.div>
  );
};

export default DevList;
