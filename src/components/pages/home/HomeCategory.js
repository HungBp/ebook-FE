import { Link } from "react-router-dom";
import BookFilter from "../../common/BookFilter";
import styles from "./HomeCategory.module.css";

function HomeCategory() {
  return ( 
    <div className={styles.category}>
      <div className={styles.left}>
        <h1 className={styles.heading}> Explore many categories of online book library </h1>
        <Link to="Category">
          <button className={styles.btn}> Browse categories </button>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.thumbnail}>
          <BookFilter
            filter = {{bestSeller: true}}
            heading = ""
            numOfBooks = {1}
            titleShow = {false}
            />
        </div>
        <div className={styles.thumbnail}>
          <BookFilter
            filter = {{newArrived: true}}
            heading = ""
            numOfBooks = {1}
            titleShow = {false}
          />
        </div>
        <div className={styles.thumbnail}>
          <BookFilter
            filter = {{bestSeller: false, newArrived: false}}
            heading = ""
            numOfBooks = {1}
            titleShow = {false}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeCategory;