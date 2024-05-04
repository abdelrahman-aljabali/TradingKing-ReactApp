import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  const navigate = useNavigate();

  const renderIcon = (change) => {
    return change > 0 ? <BsArrowUpShort /> : <BsArrowDownShort />;
  };

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const responses = [];
      try {
        const fetchedResponses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: { symbol: stock },
            });
          })
        );

        responses.push(...fetchedResponses);

        console.log(responses);

        const data = responses.map((response) => ({
          data: response.data,
          symbol: response.config.params.symbol,
        }));

        console.log(data);

        if (isMounted) setStock(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock && stock.length > 0 ? (
            stock.map((stockData) => (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>
                  {stockData.data.pc}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(stockData.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No stock data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
