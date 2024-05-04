import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
  const getInitialWatchList = () => {
    const storedWatchList = localStorage.getItem("watchList");
    return storedWatchList
      ? JSON.parse(storedWatchList)
      : ["AAPL", "MSFT", "AMZN"];
  };

  const [watchList, setWatchList] = useState(getInitialWatchList());

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addStock = (stock) => {
    if (!watchList.includes(stock)) {
      setWatchList((prevList) => [...prevList, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList((prevList) => prevList.filter((s) => s !== stock));
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListContextProvider;
