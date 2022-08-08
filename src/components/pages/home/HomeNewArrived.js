import { Link } from "react-router-dom";
import BookFilter from "../../common/BookFilter";
import styles from "./HomeNewArrived.module.css";

function HomeNewArrived() {
  return (
    <div className={styles.newArrived}>
      <BookFilter
        filter = {{newArrived: true}}
        heading = {
          <>
            <Link className={styles.heading} to="NewArrived"><h2> New Arrived </h2></Link>
            <hr className={styles.break}/>
          </>
        }
        numOfBooks = {6}
        titleShow = {true}
      />
    </div>
  );
}

export default HomeNewArrived;