import { useState, useContext } from "react";
import { uriBookFetch, BookContext } from "../../contextProvider/BookContextProvider";
import styles from "./BookForm.module.css";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Biography");
  const [description, setDescription] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrived, setNewArrived] = useState(false);
  const [image, setImage] = useState({preview: "", file: ""});
  const categoryList = ["Biography", "Business", "History", "Literature", "Mystery", "Fiction", "Romance", "Technology", "Others"];
  const {books, setBooks} = useContext(BookContext)
  
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title, author, category, description, bestSeller, newArrived, image };
    const reqOption = {
      method: "POST",
      body: JSON.stringify(data),
      header: {"Content-Type": "application/json"}
    };
    
    fetch(uriBookFetch, reqOption)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network was error");
        }
        return res.json();
      })
      .then((data) => {
        setBooks([...books, data]);
      })
      .catch((error) => {
        console.log("There has been a problem with your fetch operation:", error);
      })
      .finally(() => {
        setTitle("");
        setAuthor("");
        setCategory("Biography");
        setDescription("");
        setBestSeller(false);
        setNewArrived(false);
        setImage({ preview: "", file: "" });
      });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }
  function handleBestSellerChange(event) {
    setBestSeller(event.target.checked);
  }
  function handleNewArrivedChange(event) {
    setNewArrived(event.target.checked);
  }
  function handleImageChange(event) {
    if (event.target.files[0] === undefined ) {
      setImage({ preview: "", file: "" });
    } else {
      // convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage({
          preview: URL.createObjectURL(event.target.files[0]),
          file: reader.result
        });
      });
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend> Information </legend>

        <label htmlFor="title"> Title: </label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />

        <label htmlFor="author"> Author: </label>
        <input type="text" id="author" name="author" value={author} onChange={handleAuthorChange} required />
        
        <label htmlFor="category"> Category: </label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange} >
          { categoryList.map( cat => <option value={cat.toLowerCase()} key={cat.toLowerCase()} > {cat} </option> ) }
        </select>

        <label htmlFor="description"> Description: </label>
        <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} required />

        <label htmlFor="image" className={styles.show}> Upload Image: </label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className={styles.hidden} required/>
        { image.preview && <img src={image.preview} className={styles.preview} alt="" /> }
      </fieldset>

      <fieldset>
        <legend> Best / New </legend>

        <label htmlFor="best-seller"> Best Seller: </label>
        <input type="checkbox" id="best-seller" name="best-seller" value="Best Seller" checked={bestSeller} onChange={handleBestSellerChange} />

        <label htmlFor="new-arrived"> New Arrived: </label>
        <input type="checkbox" id="new-arrived" name="new-arrived" value="New Arrived" checked={newArrived} onChange={handleNewArrivedChange} />
      </fieldset>

      <button type="submit"> Submit </button>
    </form>
  );
}

export default BookForm;