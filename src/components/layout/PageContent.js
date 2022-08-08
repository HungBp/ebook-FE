import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { BookContext } from "../../contextProvider/BookContextProvider";
import { LoginContext } from "../../contextProvider/LoginContextProvider";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import CategoryType from "../pages/category/CategoryType";
import BestSeller from "../pages/bestseller/BestSeller";
import NewArrived from "../pages/newarrived/NewArrived";
import Search from "../pages/search/Search";
import Admin from "../pages/admin/Admin";
import Error404 from "../pages/error404/Error404";
import styles from "./PageContent.module.css";

function PageContent() {
  const {isLoading} = useContext(BookContext);
  const {setIsLogin} = useContext(LoginContext);
  
  useEffect(() => {
    // detect login session
    if (sessionStorage.getItem("token")) { setIsLogin(true); }
    else { setIsLogin(false); }
  });

  return (
    <main className={`${styles.pageContent} page-content`}>
      {
        isLoading ? <h2 className={styles.heading}>Is loading...</h2> :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Category" element={<Category />} />
            <Route path="Category/:categoryId" element={<CategoryType />} />
            <Route path="BestSeller" element={<BestSeller />} />
            <Route path="NewArrived" element={<NewArrived />} />
            <Route path="Search" element={<Search />} />
            <Route path="Admin" element={<Admin />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
      }
    </main>
  );
}

export default PageContent;