import { Link } from "react-router-dom";

function NavBar() {
  return ( 
    <nav className="nav-bar">
      <Link to="/" > Home </Link>
      <Link to="Category" > Category </Link>
      <Link to="BestSeller" > Best Seller </Link>
      <Link to="NewArrived" > New Arrived </Link>
      <Link to="User" > User </Link>
    </nav>
  );
}

export default NavBar;