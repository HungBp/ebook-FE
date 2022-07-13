import { useContext } from "react";
import { BookContext } from "../../../contextProvider/BookContextProvider";
import BookCover from "../../common/BookCover";
import BookDelete from "../../databaseCRUD/BookDelete";
import styles from "./HomeBestSeller.module.css";

function HomeBestSeller() {
  const {books, isLoading} = useContext(BookContext);
  const numBook = 5;

  const bookBestSellerList = books.filter((book) => book.bestSeller === true);
  const shuffleBookBestSellerList = bookBestSellerList.sort(() => 0.5 - Math.random());
  const booksBestSeller = shuffleBookBestSellerList.slice(0, numBook);

  // need make seperate delete button component


  return ( 
    <div className={styles.bestSeller}>
      {
        booksBestSeller.map(book => 
          <div  key={book._id}>
            { !isLoading && <BookCover book={book} /> }
            { !isLoading && <BookDelete book={book} /> }
          </div>
        )
      }
    </div>
  );
}

export default HomeBestSeller;