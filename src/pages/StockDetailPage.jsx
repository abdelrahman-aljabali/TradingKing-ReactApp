import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stockData from "../mockData/mockStockData";
import StockChart from "../components/stockChart";

// Function to format the stock data for charting

const formatData = (data) => {
  return data.map((item) => ({
    x: new Date(item.date).getTime(),
    y: parseFloat(item.close),
  }));
};

export const StockDetailPage = () => {
  const { symbol } = useParams(); // Get the stock symbol from URL parameters
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const stockHistoricalData = stockData[symbol]; // Retrieve data for the given symbol

        if (stockHistoricalData) {
          // Format data for the chart
          setChartData({
            day: formatData(stockHistoricalData.slice(-1)), // Last day
            week: formatData(stockHistoricalData.slice(-7)), // Last week
            year: formatData(stockHistoricalData), // Last year
          });
        } else {
          throw new Error(`No mock data found for ${symbol}`);
        }
      } catch (error) {
        console.error("Error loading mock stock data:", error);
      }
    };

    fetchData(); // Load data when the component mounts
  }, [symbol]);

  return (
    <div>
      <h1>Stock Detail Page for {symbol}</h1>
      {chartData ? (
        <StockChart data={chartData} />
      ) : (
        <p>No data available or loading...</p> // Corrected loading message
      )}
    </div>
  );
};

export default StockDetailPage;
