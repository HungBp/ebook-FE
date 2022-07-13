import React, { useState, useEffect } from "react";
export const uriBookFetch = "http://localhost:4000/book";
export const BookContext = React.createContext("");

function BookContextProvider({children}) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const reqOption = {
      method: "GET"
    };
    fetch(uriBookFetch, reqOption)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network was error");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <BookContext.Provider value={{books, setBooks, isLoading}}>
      {isLoading && <p>Is loading...</p>}
      {children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;