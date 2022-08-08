import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCover from "../../common/BookCover";
import styles from "./Search.module.css";

function Search() {
  const {state} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.search}>
      <h1 className={styles.heading}>{state.length} results match your search</h1>
      {state.map(book => <BookCover book={book} titleShow={true} key={book._id} />)}
    </div>
  );
}

export default Search;