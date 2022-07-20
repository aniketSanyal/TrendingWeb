import classes from "./Filter.module.css";
import { useEffect } from "react";
const Filter = ({ dev, setFiltered, activeLanguage, setActiveLanguage }) => {
  var languages = dev.map((item) => item.language);
  languages = languages.filter((item) => {
    return item !== undefined;
  });
  languages = [...new Set(languages)];

  useEffect(() => {
    if (activeLanguage === "All") {
      setFiltered(dev);
      return;
    }
    var noUndefined = dev.filter((item) => {
      return item !== undefined;
    });
    const filtered = noUndefined.filter((item) => {
      return item.language === activeLanguage;
    });
    setFiltered(filtered);
  }, [activeLanguage, dev, setFiltered]);

  return (
    <div className={classes.filtercontainer}>
      <button
        onClick={() => setActiveLanguage("All")}
        className={
          activeLanguage === "All" ? classes.highlighted : classes.filterbuttons
        }
      >
        All
      </button>
      {languages.map((item) => (
        <button
          onClick={(event) => setActiveLanguage(item)}
          className={
            activeLanguage === item
              ? classes.highlighted
              : classes.filterbuttons
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default Filter;
