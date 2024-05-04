// src/data/mockStockData.js
const generateRandomStockData = (symbol, startDate, endDate) => {
  const data = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const open = (Math.random() * 100 + 100).toFixed(2);
    const high = (parseFloat(open) + Math.random() * 10).toFixed(2);
    const low = (parseFloat(open) - Math.random() * 10).toFixed(2);
    const close = (parseFloat(low) + Math.random() * 10).toFixed(2);

    data.push({
      symbol,
      date: currentDate.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const startDate = "2023-05-03";
const endDate = "2024-05-03";

const stockData = {
  GOOGL: generateRandomStockData("GOOGL", startDate, endDate),
  MSFT: generateRandomStockData("MSFT", startDate, endDate),
  AMZN: generateRandomStockData("AMZN", startDate, endDate),
};

export default stockData;
