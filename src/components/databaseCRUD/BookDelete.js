import axios from 'axios';
import { useContext } from "react";
import { BookContext } from "../../contextProvider/BookContextProvider";
import styles from "./BookDelete.module.css";

function BookDelete({book}) {
  const {books, setBooks} = useContext(BookContext);

  function handleDeleteBtnClick(id) {
    window.confirm("You want to delete this book?") &&
    axios.delete(`/book/${id}`, {headers: {"Content-Type": "application/json","Authorization": `Bearer ${localStorage.getItem("token")}`}})
      .then(res => (res.statusText === "OK") && res.data.acknowledged && setBooks(books.filter(book => book._id !== id)))
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <button className={styles.delBtn} onClick={() => handleDeleteBtnClick(book._id)} > Delete </button>
  );
}

export default BookDelete;