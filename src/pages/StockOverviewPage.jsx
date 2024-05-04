import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";
import trading from "../images/Trading.png"; // Ensure the correct path and import syntax

export const StockOverviewPage = () => {
  return (
    <div>
      <div className="text-center">
        <img
          src={trading}
          alt="Trading illustration"
          style={{ width: "20%", height: "auto" }}
        />{" "}
        {/* Added alt attribute and optional style */}
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};
