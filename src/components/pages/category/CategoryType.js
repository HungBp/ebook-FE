import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookFilter from "../../common/BookFilter";
import styles from "./CategoryType.module.css";

function CategoryType() {
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.category}>
      <div className={styles.categorySection} >
        <BookFilter
          filter = {{category: params.categoryId.toLowerCase()}}
          heading = {<h2 className={styles.headingSection}> {params.categoryId} </h2>}
          numOfBooks = {1000}
          titleShow = {true}
        />
      </div>
    </div>
  );
}

export default CategoryType;