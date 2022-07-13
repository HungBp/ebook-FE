import styles from "./BookCover.module.css";

function BookCover({book}) {
  if (book === undefined) {return null;}
  
  return ( 
    <div className={styles.bookCover}>
      <img src={book.image.file} className={styles.imgCover} alt="" />
      <p className={styles.text}>{book.title}</p>
      <p className={styles.text}>{book.author}</p>
      {/* <div>{book.category}</div> */}
      {/* <div>{book.description}</div> */}
      {book.bestSeller ? <img className={`${styles.icon} ${styles.bestSeller}`} src="assets/best-seller.png" alt="best seller" /> : ""}
      {book.newArrived ? <img className={`${styles.icon} ${styles.new}`} src="assets/new.png" alt="new arrived" /> : ""}
      {/* <div>{book.createAt}</div> */}
    </div>
   );
}

export default BookCover;