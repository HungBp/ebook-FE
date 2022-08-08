import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import styles from "./NavBar.module.css";

function NavBar() {
  const navBarRef = useRef();
  const navigatorRef = useRef();
  let prevScroll = 0;

  useEffect(() => {
    navigatorRef.current && (navigatorRef.current.style.transform = "rotate(0turn)");
    window.addEventListener("scroll", showNavBarOnScroll);
    // hide nav bar when click outside
    window.addEventListener("click", hideNavBar);
    // eslint-disable-next-line
  }, []);

  function handleNavigatorClick() {
    if (getComputedStyle(navigatorRef.current).display === "block") {
      if (navigatorRef.current.style.transform === "rotate(0turn)") {
        navigatorExpand();
      } else {
        navigatorCollapse();
      }
    }
  }

  function hideNavBar(event) {
    if (!window.matchMedia("(min-width: 600px)").matches) {
      navBarRef.current && !navBarRef.current.contains(event.target) && navigatorCollapse();
    }
  }

  function showNavBarOnScroll() {
    let currentScroll = window.scrollY;
    navBarRef.current && (navBarRef.current.style.top = ((currentScroll > prevScroll) && (currentScroll >= 50)) ? "-50px" : "0px");
    (!window.matchMedia("(min-width: 600px)").matches) && navigatorCollapse();
    prevScroll = currentScroll;
  }
  
  function navigatorExpand() {
    navBarRef.current.style.maxHeight = "250px";
    navigatorRef.current.style.transform = "rotate(0.25turn)";
  }
  
  function navigatorCollapse() {
    navBarRef.current.style.maxHeight = "50px";
    navigatorRef.current.style.transform = "rotate(0turn)";
  }
  
  return ( 
    <nav className={styles.navBar} ref={navBarRef} >
      <div className={styles.left}>
        <div className={styles.navigator} ref={navigatorRef} onClick={handleNavigatorClick} >&#9776;</div>
        <img className={styles.logo} src="/assets/books-logo.png" alt="logo" />
        <NavLink
          to = "/"
          className = {({ isActive }) => isActive ? styles.menusActive : styles.menus}
          onClick = {handleNavigatorClick}
        >
          Home
        </NavLink>
        <NavLink
          to = "Category"
          className = {({ isActive }) => isActive ? styles.menusActive : styles.menus}
          onClick = {handleNavigatorClick}
        >
          Category
        </NavLink>
        <NavLink
          to = "BestSeller"
          className = {({ isActive }) => isActive ? styles.menusActive : styles.menus}
          onClick = {handleNavigatorClick}
        >
          Best Seller
        </NavLink>
        <NavLink
          to = "NewArrived"
          className = {({ isActive }) => isActive ? styles.menusActive : styles.menus}
          onClick = {handleNavigatorClick}
        >
          New Arrived
        </NavLink>
      </div>
      <div className={styles.right}>
        <SearchBar handleNavigatorClick={handleNavigatorClick} />
        <NavLink
          to = "Admin"
          className = {({ isActive }) => isActive ? styles.menusActive : styles.menus}
          onClick = {handleNavigatorClick}
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;