import React, { useEffect, useReducer, useState } from "react";
import { get_stock_data, get_stock_symbols } from "./data";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import Cards, { FavoriteCards } from "./Cards";
import SearchBar from "./SearchBar";
import { searchReducer, StockState } from "./reducer";
import { StockContext, StockDetails } from "./Context";
import { getSymbolCookie } from "./cookies";

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
  const [stockDetails, setStockDetails] = useState<any>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  useEffect(() => {
    // get_stock_symbols("apple");
  }, []);

  return (
    <div className="container">
      <StockContext.Provider value={{ stock, setStock }}>
        <StockDetails.Provider value={{ stockDetails, setStockDetails }}>
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

          <h4>My favorites</h4>
          {getSymbolCookie() && <FavoriteCards />}

          {stockDetails ? (
            <Cards
              symbol={stockDetails["Meta Data"]["2. Symbol"]}
              date={stockDetails["Meta Data"]["3. Last Refreshed"]}
              open={
                stockDetails["Time Series (1min)"][
                  Object.keys(stockDetails["Time Series (1min)"])[0]
                ]["1. open"]
              }
              high={
                stockDetails["Time Series (1min)"][
                  Object.keys(stockDetails["Time Series (1min)"])[0]
                ]["2. high"]
              }
              low={
                stockDetails["Time Series (1min)"][
                  Object.keys(stockDetails["Time Series (1min)"])[0]
                ]["3. low"]
              }
            />
          ) : (
            console.log("no ")
          )}

          {/* <p>hello, {state?.keyword}</p> */}
        </StockDetails.Provider>
      </StockContext.Provider>
    </div>
  );
}

export default App;
