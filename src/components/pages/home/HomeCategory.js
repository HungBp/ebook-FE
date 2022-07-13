import { useContext } from "react";
import { BookContext } from "../../../contextProvider/BookContextProvider";
import BookCover from "../../common/BookCover";
import styles from "./HomeCategory.module.css";

function HomeCategory() {
  const {books, isLoading} = useContext(BookContext);
  // pick 1 random book from list of best seller/new arrived/category
  const bookBestSellerList = books.filter((book) => book.bestSeller === true);
  const bookBestSeller = bookBestSellerList[Math.floor(Math.random() * bookBestSellerList.length)];

  const bookNewArrivedList = books.filter((book) => book.newArrived === true);
  const bookNewArrived = bookNewArrivedList[Math.floor(Math.random() * bookNewArrivedList.length)];
  
  const bookCategoryList = books.filter((book) => (book.bestSeller === false) && (book.newArrived === false));
  const bookCategory = bookCategoryList[Math.floor(Math.random() * bookCategoryList.length)];

  return ( 
    <div className={styles.category}>
      <div className={styles.left}>
        <h1 className={styles.heading}> Explore many categories of online book library </h1>
        <button className={styles.btn}> Browse categories </button>
      </div>

      <div className={styles.right}>
        { !isLoading && <BookCover book={bookBestSeller} /> }
        { !isLoading && <BookCover book={bookNewArrived} /> }
        { !isLoading && <BookCover book={bookCategory} /> }
      </div>
    </div>
  );
}

export default HomeCategory;