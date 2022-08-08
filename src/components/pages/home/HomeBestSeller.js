import { Link } from "react-router-dom";
import BookFilter from "../../common/BookFilter";
import styles from "./HomeBestSeller.module.css";

function HomeBestSeller() {
  return (
    <div className={styles.bestSeller}>
      <BookFilter
        filter = {{bestSeller: true}}
        heading = {
          <>
            <Link className={styles.heading} to="BestSeller"><h2> Best Seller </h2></Link>
            <hr className={styles.break}/>
          </>
        }
        numOfBooks = {6}
        titleShow = {true}
      />
    </div>
  );
}

export default HomeBestSeller;