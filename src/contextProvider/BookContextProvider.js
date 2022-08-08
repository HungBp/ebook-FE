import { useState, useEffect, createContext } from "react";
export const BookContext = createContext("");

function BookContextProvider({children}) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch("/book", {method: "GET"})
      .then(res => res.json().then(data => {
        if (!res.ok) {
          throw data.error;
        } else {
          setBooks(data);
          setIsLoading(false);
        }
      }))
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <BookContext.Provider value={{books, setBooks, isLoading}}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;