import { useContext, useState } from "react";
import { LoginContext } from "../../contextProvider/LoginContextProvider";
import BookDelete from "../databaseCRUD/BookDelete";
import styles from "./BookCover.module.css";
import BookDetail from "./BookDetail";

function BookCover({book, titleShow}) {
  const [bookDetail, setBookDetail] = useState(false);
  const {isLogin} = useContext(LoginContext);

  if (book === undefined) {return null;}

  function handleBookCoverClick() { setBookDetail(true); }
  
  return (
    <>
      <div className={styles.bookCover}>
        { isLogin && <BookDelete book={book} key={book._id} /> }
        <div className={styles.container} onClick={handleBookCoverClick}>
          <img src={book.image} className={styles.imgCover} alt="" />
          {book.bestSeller ? <img className={`${styles.icon} ${styles.bestSeller}`} src="/assets/best-seller.png" alt="best seller" /> : ""}
          {book.newArrived ? <img className={`${styles.icon} ${styles.newArrived}`} src="/assets/new.png" alt="new arrived" /> : ""}
        </div>
        {
          titleShow &&
            <>
              <p onClick={handleBookCoverClick} className={styles.title}>{book.title}</p>
              <p onClick={handleBookCoverClick} className={styles.author}>{book.author}</p>
            </>
        }
      </div>

      <BookDetail book={book} bookDetail={bookDetail} setBookDetail={setBookDetail} search={false} />
    </>
   );
}

export default BookCover;