import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../../contextProvider/BookContextProvider";
import BookDetail from "./BookDetail";
import styles from "./SearchBar.module.css";

function SearchBar({handleNavigatorClick}) {
  const {books, isLoading} = useContext(BookContext);
  const [search, setSearch] = useState("");
  const [booksSearch, setBooksSearch] = useState([]);
  const [bookDetail, setBookDetail] = useState(false);
  const [bookDetailRender, setBookDetailRender] = useState(false);
  const searchListRef = useRef(null);
  const searchBarRef = useRef(null);
  const iconRef = useRef(null);
  const backgroundRef = useRef(null);
  const numOfBooks = 5;
  
  useEffect(() => {
    initialValue();
    backgroundRef.current && (backgroundRef.current.style.display = "none");
    window.addEventListener("resize", () => {
      initialValue();
      noneDisplay();
    });
    window.addEventListener("scroll", () => {
      if (document.body.style.overflow === "auto") {
        noneDisplay();
        initialValue();
        searchBarRef.current.blur();
      }
    });
  }, [isLoading]);

  useEffect(() => { bookDetailRender && setBookDetail(true); }, [bookDetailRender]);
  
  useEffect(() => {
    // search bar is empty / have text
    searchListRef.current && (searchListRef.current.style.display = search ? "block" : "none");
    // focus in search bar when typing, in case search bar is out of focus but have no click
    search && backgroundRef.current && (backgroundRef.current.style.display = "block");
    // eslint-disable-next-line
  }, [search]);

  function handleSeacrhBarChange(event) {
    const regex = new RegExp("\\b" + event.target.value, "gi");
    setSearch(event.target.value);
    setBooksSearch(books.filter(book => regex.test(book.title) || regex.test(book.author)));
  }
  
  function handleBookClick(index) {
    let temp = [];
    for (let i = 0; i < Math.min(numOfBooks, booksSearch.length); i++) { temp[i] = (i === index) ? true : false; }
    // choose which search to render book detail before actually rendering by useEffect so that transition worked!
    setBookDetailRender(temp);
  }
  
  function handleIconClick(event) {
    event.stopPropagation();
    searchListAppearance(event);
    backgroundApperance(event);
    
    if (window.matchMedia('(min-width: 600px) and (max-width: 800px)').matches) {
      if (searchBarRef.current.style.width === "0px") {
        searchBarRef.current.style.width = "50vw";
        searchBarRef.current.style.opacity = "1";
        searchBarRef.current.style.visibility = "visible";
        // delay for transition run before search bar can be focus
        setTimeout(() => {searchBarRef.current.focus();}, 100);
      } else {
        searchBarRef.current.style.width = "0px";
        searchBarRef.current.style.opacity = "0";
        searchBarRef.current.style.visibility = "hidden";
        noneDisplay();
      }
    } else {
      searchBarRef.current.style.width = "";
      searchBarRef.current.style.opacity = "";
      searchBarRef.current.style.visibility = "";
      searchBarRef.current.focus();
    }
  }
  
  function handleMoreBooksClick() {
    initialValue();
    noneDisplay();
    !window.matchMedia("(min-width: 600px)").matches && handleNavigatorClick();
  }

  
  window.addEventListener("click", (event) => {
    searchListAppearance(event);
    backgroundApperance(event);
    searchBarRef.current && !searchBarRef.current.contains(event.target)  && !searchListRef.current.contains(event.target) && (searchBarRef.current.style.width === "50vw") && handleIconClick(event);
  });

  
  function initialValue() {
    if (!window.matchMedia("(min-width: 600px)").matches) {
      searchListRef.current.style.left = "";
      searchBarRef.current.style.width = "";
      searchBarRef.current.style.opacity = "";
      searchBarRef.current.style.visibility = "";
    } else if (!window.matchMedia("(max-width: 800px)").matches) {
      searchListRef.current.style.left = `${(searchBarRef.current.getBoundingClientRect().right - searchBarRef.current.getBoundingClientRect().width / 2 - parseInt(getComputedStyle(searchListRef.current).width) / 2).toString()}px`;
      searchBarRef.current.style.width = "";
      searchBarRef.current.style.opacity = "";
      searchBarRef.current.style.visibility = "";
    } else {
      searchListRef.current.style.left = `${(searchBarRef.current.getBoundingClientRect().right - window.innerWidth / 4 - parseInt(getComputedStyle(searchListRef.current).width) / 2).toString()}px`;
      searchBarRef.current.style.width = "0px";
      searchBarRef.current.style.opacity = "0";
      searchBarRef.current.style.visibility = "hidden";
    }
  }
  
  function searchListAppearance(event) {
    // click in search bar || icon
    searchBarRef.current && (searchBarRef.current.contains(event.target) || iconRef.current.contains(event.target)) && (searchListRef.current.style.display = search ? "block" : "none");
    // click out search bar & icon & search list
    searchListRef.current && !searchListRef.current.contains(event.target) && !searchBarRef.current.contains(event.target) && !iconRef.current.contains(event.target) && (searchListRef.current.style.display = "none");
  }
  
  function backgroundApperance(event) {
    // search bar have text
    search && searchListRef.current && (backgroundRef.current.style.display = (searchListRef.current.style.display === "block") ? "block" : "none");
    // search bar is empty & click in/out search bar || icon
    !search && searchBarRef.current && (backgroundRef.current.style.display = (searchBarRef.current.contains(event.target) || (iconRef.current.contains(event.target))) ? "block" : "none");
  }
  
  function noneDisplay() {
    searchListRef.current.style.display = "none";
    backgroundRef.current.style.display = "none";
  }
  
  return (
    <div className={styles.container}>
      <img className={styles.icon}  ref={iconRef} src="/assets/search-bar-icon.png" alt="" aria-labelledby="searchBar" onClick={handleIconClick} />
      <input className={styles.searchBar} ref={searchBarRef} type="search" name="searchBar" id="searchBar" value={search} autoComplete="off" placeholder="Search by title or author" onChange={handleSeacrhBarChange} />
      <ul className={styles.searchList} ref={searchListRef}>
        {
          (booksSearch.length > 0) ?
            booksSearch.slice(0, Math.min(numOfBooks, booksSearch.length)).map((book, index) => 
              <div key={book._id}>
                <li className={styles.book} onClick={() => handleBookClick(index)}>
                  <p className={styles.title}>{book.title}</p>
                  <p className={styles.author}>{book.author}</p>
                </li>
                {bookDetailRender[index] && <BookDetail book={book} bookDetail={bookDetail} setBookDetail={setBookDetail} search={true} />}
              </div>) : <li className={styles.noMatching}>No result matching!</li>
        }
        { (booksSearch.length > numOfBooks) && <li className={styles.book} onClick={handleMoreBooksClick}><Link className={styles.more} to="Search" state={booksSearch}>More books...</Link></li> }
      </ul>
      <div className={styles.background} ref={backgroundRef}></div>
    </div>
  );
}

export default SearchBar;