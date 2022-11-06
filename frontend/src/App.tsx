import React, { useEffect, useReducer, useState } from "react";
import { get_stock_data, get_stock_symbols } from "./data";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import { searchReducer, StockState } from "./reducer";
import { StockContext } from "./Context";

function App() {
  // const [stock, setStock] = useState<String>("Googl");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);

  //const [stockData, setStockData] = useState<IStock>({})
  // const [state, dispatch] = useReducer(searchReducer, StockState);

  interface IStock {
    symbol: String;
    current: String;
    high: String;
    low: String;
  }

  const [stock, setStock] = useState<any>("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  useEffect(() => {
    // get_stock_symbols("apple");
  }, []);

  return (
    <div className="container">
      <StockContext.Provider value={{ stock, setStock }}>
        <p>Stock follower</p>
        <SearchBar />
        {loading && <LoadingScreen />}
        {/* <Cards symbol="frf" open="22" high="111" low="2" /> */}

        {/* {stock != "" && <p>{stock}</p>} */}

        {data && (
          <div>
            <p>{data["Meta Data"]["2. Symbol"]}</p>
            <p>{data["Meta Data"]["Time Series (1min)"]}</p>
          </div>
        )}

        {/* <p>hello, {state?.keyword}</p> */}
      </StockContext.Provider>
    </div>
  );
}

export default App;
