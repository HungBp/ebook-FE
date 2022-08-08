import { useEffect } from "react";
import BookFilter from "../../common/BookFilter";
import styles from "./NewArrived.module.css";

function NewArrived() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return ( 
    <div className={styles.newArrived}>
      <BookFilter
        filter = {{newArrived: true}}
        heading = {<h1 className={styles.heading}>New Arrived</h1>}
        numOfBooks = {100}
        titleShow = {true}
        />
    </div>
  );
}

export default NewArrived;