import { useContext } from "react";
import { BookContext } from "../../contextProvider/BookContextProvider";
import BookCover from "../common/BookCover";
import styles from "./BookFilter.module.css";

function BookFilter(props) {
  const {books, isLoading} = useContext(BookContext);
  // filter books based on many book's properties
  const filterBookList = books.filter(book => {
    const propsFilter = Object.keys(props.filter);
    for (const prop of propsFilter) {
      if (book[prop] === props.filter[prop]) { continue; }
      else { return false; }
    }
    return true;
  });
  // make random list
  const shuffleFilterBookList = filterBookList.sort(() => 0.5 - Math.random());
  const remainingBooks = shuffleFilterBookList.slice(0, Math.min(props.numOfBooks, filterBookList.length));
  
  return (
    <>
      {
        !isLoading &&
          <>
            {props.heading}
            <div className={styles.bookFilter}>
              { remainingBooks.map(book => <BookCover book={book} titleShow={props.titleShow} key={book._id} />)}
            </div>
          </>
      }
    </>
  );
}

export default BookFilter;