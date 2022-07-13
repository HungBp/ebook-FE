import { Routes, Route } from "react-router-dom";
import BookContextProvider from "../../contextProvider/BookContextProvider";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import BestSeller from "../pages/bestseller/BestSeller";
import NewArrived from "../pages/newarrived/NewArrived";
import User from "../pages/user/User";

function PageContent() {
  return ( 
    <main className="page-content">
      <BookContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Category" element={<Category />} />
          <Route path="BestSeller" element={<BestSeller />} />
          <Route path="NewArrived" element={<NewArrived />} />
          <Route path="User" element={<User />} />
        </Routes>
      </BookContextProvider>
    </main>
  );
}

export default PageContent;