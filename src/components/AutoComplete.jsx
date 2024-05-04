import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {result.map((resultItem) => (
          <li
            onClick={() => {
              addStock(result.symbol);
              setSearch("");
            }}
            key={resultItem.symbol}
            className="dropdown-item"
          >
            {resultItem.description}({resultItem.symbol})
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        console.log(response);

        if (isMounted) {
          setResult(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (search.length > 0) fetchData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ background: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
