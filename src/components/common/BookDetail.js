import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./BookDetail.module.css";

function BookDetail({book, bookDetail, setBookDetail, search}) {
  // fix issue findDOMNode is deprecated in StrictMode...
  // ref: https://github.com/reactjs/react-transition-group/issues/668
  const backgroundRef = useRef(null);
  const bookDetailRef = useRef(null);
  const timeOut = 500;
  let pageContentStyle = document.querySelector(".page-content").style;

  useEffect(() => {
    (pageContentStyle.zIndex === "") && (pageContentStyle.zIndex = "1");
    document.body.style.overflow = bookDetail ? "hidden" : "auto";
    // hide modal when click outside
    window.addEventListener("click", hideModal);
    pageContentStyle.zIndex = (!search && bookDetail) ? "3" : "1";
    bookDetail && (window.scrollY > 0) && (window.scrollY < 50) && window.scrollTo(0, 50);

    function hideModal(event) {
      bookDetailRef.current && !bookDetailRef.current.contains(event.target) && backgroundRef.current.contains(event.target) && handleCloseBtnClick();
    }

    return () => { window.removeEventListener("click", hideModal); }
    // eslint-disable-next-line
  }, [bookDetail]);
  
  function handleCloseBtnClick() { setBookDetail(false); }

  return (
    <CSSTransition
      nodeRef = {backgroundRef}
      in = {bookDetail} 
      unmountOnExit = {true}
      timeout = {timeOut}
      classNames = {{
        enter: styles.fadeEnter,
        enterActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive
      }}
    >
      <div ref={backgroundRef} className={styles.background}>
        <div className={styles.bookDetail} ref={bookDetailRef}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.container}>
                <img src={book.image} className={styles.image} alt="" />
                {book.bestSeller ? <img className={`${styles.icon} ${styles.bestSeller}`} src="/assets/best-seller.png" alt="best seller" /> : ""}
                {book.newArrived ? <img className={`${styles.icon} ${styles.newArrived}`} src="/assets/new.png" alt="new arrived" /> : ""}
              </div>
            </div>
            <div className={styles.right}>
              <h1 className={styles.title}>{book.title}</h1>
              <h2 className={styles.author}>{book.author}</h2>
              <h2 className={styles.category}>{book.category.toUpperCase()}</h2>
            </div>
          </div>
          <div className={styles.bottom}>
            <p className={styles.description}>{book.description}</p>
          </div>
          <button className={styles.closeBtn} onClick={handleCloseBtnClick}>X</button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default BookDetail;