import { BrowserRouter } from "react-router-dom";
import BookContextProvider from "../src/contextProvider/BookContextProvider";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import PageContent from "./components/layout/PageContent";
import LoginContextProvider from "./contextProvider/LoginContextProvider";

function App() {
  return (
    <BrowserRouter>
      <BookContextProvider>
        <LoginContextProvider>
          <NavBar />
          <PageContent />
          <Footer />
        </LoginContextProvider>
      </BookContextProvider>
    </BrowserRouter>
  );
}

export default App;
