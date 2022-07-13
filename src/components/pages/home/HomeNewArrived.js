import { useContext } from "react";
import { BookContext } from "../../../contextProvider/BookContextProvider";
import BookCover from "../../common/BookCover";
import BookDelete from "../../databaseCRUD/BookDelete";
import styles from "./HomeNewArrived.module.css";

function HomeNewArrived() {
  const {books, isLoading} = useContext(BookContext);
  const numBook = 5;

  const bookNewArrivedList = books.filter((book) => book.newArrived === true);
  const shuffleBookNewArrivedList = bookNewArrivedList.sort(() => 0.5 - Math.random());
  const booksNewArrived = shuffleBookNewArrivedList.slice(0, numBook);

  // need make seperate delete button component


  return ( 
    <div className={styles.NewArrived}>
      {
        booksNewArrived.map(book => 
          <div  key={book._id}>
            { !isLoading && <BookCover book={book} /> }
            { !isLoading && <BookDelete book={book} /> }
          </div>
        )
      }
    </div>
  );
}

export default HomeNewArrived;