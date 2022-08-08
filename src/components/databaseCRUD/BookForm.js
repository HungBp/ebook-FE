import axios from 'axios';
import { useState, useContext } from "react";
import { BookContext } from "../../contextProvider/BookContextProvider";
import { LoginContext } from "../../contextProvider/LoginContextProvider";
import styles from "./BookForm.module.css";
export const categoryList = ["Biography", "Business", "History", "Literature", "Fiction", "Romance", "Technology", "Others"];

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("biography");
  const [description, setDescription] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrived, setNewArrived] = useState(false);
  const [image, setImage] = useState("");
  const {books, setBooks} = useContext(BookContext)
  const {setIsLogin} = useContext(LoginContext);
  
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title, author, category, description, bestSeller, newArrived, image };

    axios.post("/book", data, {headers: {"Content-Type": "application/json","Authorization": `Bearer ${localStorage.getItem("token")}`}})
      .then(res => (res.statusText === "OK") && setBooks([...books, res.data]))
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setTitle("");
        setAuthor("");
        setCategory("biography");
        setDescription("");
        setBestSeller(false);
        setNewArrived(false);
        setImage("");
      });
  }

  function handleImageChange(event) {
    if (event.target.files[0] === undefined ) {
      setImage("");
    } else {
      // convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => setImage(reader.result));
    }
  }

  function handleLogoutClick() {
    setIsLogin(false);
    sessionStorage.removeItem("token");
  }

  return (
    <div className={styles.bookForm}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.section} ${styles.title} ${styles.item1}`}>
            <h1 className={styles.title}> Book Upload </h1>
          </div>

          <div className={`${styles.section} ${styles.item2}`}>
            <label className={styles.label} htmlFor="title"><h2 className={styles.heading}> Title </h2></label>
            <input type="text" id="title" name="title" value={title} onChange={event => setTitle(event.target.value)} autoComplete="off" required className={styles.input} />
          </div>

          <div className={`${styles.section} ${styles.item3}`}>
            <label className={styles.label} htmlFor="best-seller"><h2 className={styles.heading}> Best Seller </h2></label>
            <input type="checkbox" id="best-seller" name="best-seller" checked={bestSeller} onChange={event => setBestSeller(event.target.checked)} className={styles.checkbox} />
          </div>

          <div className={`${styles.section} ${styles.item4}`}>
            <label className={styles.label} htmlFor="author"><h2 className={styles.heading}> Author </h2></label>
            <input type="text" id="author" name="author" value={author} onChange={event => setAuthor(event.target.value)} autoComplete="off" required className={styles.input} />
          </div>

          <div className={`${styles.section} ${styles.item5}`}>
            <label className={styles.label} htmlFor="new-arrived"><h2 className={styles.heading}> New Arrived </h2></label>
            <input type="checkbox" id="new-arrived" name="new-arrived" checked={newArrived} onChange={event => setNewArrived(event.target.checked)} className={styles.checkbox} />
          </div>

          <div className={`${styles.section} ${styles.item6}`}>
            <label className={styles.label} htmlFor="description"><h2 className={styles.heading}> Description </h2></label>
            <input type="text" id="description" name="description" value={description} onChange={event => setDescription(event.target.value)} autoComplete="off" required className={styles.input} />
          </div>

          <div className={`${styles.section} ${styles.imageCover} ${styles.item7}`}>
            <label className={`${styles.label} ${styles.image}`} htmlFor="image"><h2 className={styles.heading}> Upload Image </h2></label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className={styles.hidden} required />
            { image && <img src={image} className={styles.preview} alt="" /> }
          </div>
          
          <div className={`${styles.section} ${styles.item8}`}>
            <label className={styles.label} htmlFor="category"><h2 className={styles.heading}> Category </h2></label>
            <select id="category" name="category" value={category} onChange={event => setCategory(event.target.value.toLowerCase())} className={styles.input} >
              { categoryList.map( cat => <option value={cat.toLowerCase()} key={cat.toLowerCase()} > {cat} </option> ) }
            </select>
          </div>

          <div className={`${styles.section} ${styles.submitCover} ${styles.item9}`}>
            <button className={styles.submitBtn} type="submit"> Submit </button>
          </div>
        </form>

      </div>
      <button className={styles.logoutBtn} onClick={handleLogoutClick}> Logout </button>
    </div>
  );
}

export default BookForm;