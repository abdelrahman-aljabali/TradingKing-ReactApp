import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import stockData from "../mockData/mockStockData";

export const StockChart = () => {
  const { symbol } = useParams();

  const stockHistoricalData = stockData[symbol];

  if (!stockHistoricalData) {
    return <p>No data available for {symbol}</p>;
  }

  const series = [
    {
      name: `${symbol} Stock Price`,
      data: stockHistoricalData.map((item) => ({
        x: new Date(item.date).getTime(),
        y: parseFloat(item.close),
      })),
    },
  ];

  const options = {
    title: {
      text: `Stock Price Chart for ${symbol}`,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      type: "line",
      animations: {
        speed: 1300,
      },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM",
          day: "dd",
          hour: "HH:mm",
        },
      },
    },
    markers: {
      size: 4,
    },
    colors: ["#2E93fA"],
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" width="100%" />
    </div>
  );
};

export default StockChart;
