import { useContext } from "react";
import { uriBookFetch, BookContext } from "../../contextProvider/BookContextProvider";
import styles from "./BookDelete.module.css";

function BookDelete({book}) {
  const {books, setBooks} = useContext(BookContext);

  function handleDeleteBtnClick(id) {
    fetch(`${uriBookFetch}/${id}`, {method: "DELETE"})
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network was error");
        }
        return res.json();
      })
      .then((data) => {
        if(data.acknowledged) {
          setBooks(books.filter((book) => book._id !== id))
        }
      })
      .catch((error) => {
        console.log("There has been a problem with your fetch operation:", error);
      })
  }

  return (
    <button className={styles.delBtn} onClick={() => handleDeleteBtnClick(book._id)} > Delete </button>
  );
}

export default BookDelete;