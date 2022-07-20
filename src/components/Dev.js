import React from "react";
import DevList from "./DevList";
import classes from "./Dev.module.css";
import { motion } from "framer-motion";

const Dev = (props) => {
  return (
    <motion.div className={classes["dev-list"]}>
      {props.developer
        .filter((data) => {
          if (props.search === "") {
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
            activeLanguage ={props.activeLanguage}
          />
        ))}
    </motion.div>
  );
};

export default Dev;
