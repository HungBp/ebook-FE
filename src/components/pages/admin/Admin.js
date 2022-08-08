import { useContext } from "react";
import { LoginContext } from "../../../contextProvider/LoginContextProvider";
import Login from "./Login";
import BookForm from "../../databaseCRUD/BookForm";

function Admin() {
  const {isLogin} = useContext(LoginContext);

  return (
    <>
      {!isLogin && <Login />}
      {isLogin && <BookForm />}
    </>
  );
}

export default Admin;