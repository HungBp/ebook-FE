import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import PageContent from "./components/layout/PageContent";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <PageContent />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
