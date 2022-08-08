import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryList } from "../../databaseCRUD/BookForm"
import BookFilter from "../../common/BookFilter";
import styles from "./Category.module.css";

function Category() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // categoryEnable include all categories name and "All"
  const [categoryEnable, setCategoryEnable] = useState(() => {
    const obj = {};
    categoryList.forEach(category => {obj[category] = false;})
    obj["All"] = true;
    return obj;
  });

  function handleButtonClick(event) {
    const obj = {};
    let _categoryValue = false;
    let allCategories = true;
    
    categoryList.forEach((category, index) => {
      if (event.target.innerText === category) {
        obj[category] = !categoryEnable[category];
        event.target.style.backgroundColor = (event.target.style.backgroundColor === "") ? "#3aafa9" : ""; 
      } else {
        obj[category] = categoryEnable[category];
      }

      // All categories have the same value (true or false) that making "All" to true
      if ((index > 0) && (obj[category] !== _categoryValue)) { allCategories = false; }
      _categoryValue = obj[category];
    });

    obj["All"] = (allCategories === true) ? true : false;
    setCategoryEnable(obj);
  }

  return (
    <div className={styles.category}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Explore many categories</h1>
        <p className={styles.para}>There's something for everybody</p>
        <div className={styles.filter}>
          { categoryList.map(category => <div className={styles.btn} key={category} onClick={handleButtonClick}> {category} </div>)}
        </div>
      </div>
      { 
        categoryList.map(category => 
          (categoryEnable[category] || categoryEnable["All"]) && 
            <div className={styles.categorySection} key={category} >
              <BookFilter
                filter = {{category: category.toLowerCase()}}
                heading = {<Link className={styles.headingSection} to={`${category}`}><h2> {category} </h2></Link>}
                numOfBooks = {4}
                titleShow = {true}
              />
            </div>
        )
      }
    </div>
  );
}

export default Category;