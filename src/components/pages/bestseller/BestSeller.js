import { useEffect } from "react";
import BookFilter from "../../common/BookFilter";
import styles from "./BestSeller.module.css";

function BestSeller() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.bestSeller}>
      <BookFilter
        filter = {{bestSeller: true}}
        heading = {<h1 className={styles.heading}>Best Seller</h1>}
        numOfBooks = {100}
        titleShow = {true}
        />
    </div>
   );
}

export default BestSeller;