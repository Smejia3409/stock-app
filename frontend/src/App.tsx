import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import Cards, { FavoriteCards } from "./Cards";
import SearchBar from "./SearchBar";
import { StockContext, StockDetails } from "./Context";
import { getSymbolCookie } from "./cookies";

import { FiSettings } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";

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
          <div className="row">
            <p className="col-11">Stock follower</p>
            {/* <button className="btn btn-light col-1">
              <FiSettings />
            </button> */}
            <Dropdown className="col-1">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <FiSettings />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  Delete Favorites Stocks
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

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

          {getSymbolCookie() && (
            <>
              <h4>My favorites</h4>
              <FavoriteCards />
            </>
          )}

          {stockDetails && stockDetails["Meta Data"] && (
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
          )}

          {/* <p>hello, {state?.keyword}</p> */}
        </StockDetails.Provider>
      </StockContext.Provider>
    </div>
  );
}

export default App;
