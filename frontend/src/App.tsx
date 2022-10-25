import React, { useEffect, useState } from "react";
// import { data_fetch } from "./data";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

function App() {
  const [stock, setStock] = useState<String>("Googl");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<Boolean>(true);
  //const [stockData, setStockData] = useState<IStock>({})

  interface IStock {
    symbol: String;
    current: String;
    high: String;
    low: String;
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  const config: Object = {
    params: {
      interval: "1min",
      function: "TIME_SERIES_INTRADAY",
      symbol: "AAPL",
      datatype: "json",
      output_size: "compact",
    },
    headers: {
      "X-RapidAPI-Key": "40c18545dfmshd6b127ed3b5e3adp182eefjsne60db23d61ca",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  const data_fetch = async () => {
    try {
      let { data: stock_data } = await axios.get(
        "https://alpha-vantage.p.rapidapi.com/query",
        config
      );
      setData(stock_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    data_fetch();
  }, []);

  // console.log(data.data["Meta Data"]["2. Symbol"]);

  // data_fetch();
  return (
    <div className="container">
      <p>Stock follower</p>
      {loading && <LoadingScreen />}
      {/* <p>Stock: {data.data}</p> */}
      {/* <p>{data.data["Meta Data"]["2. Symbol"]}</p> */}

      {data && (
        <div>
          <p>{data["Meta Data"]["2. Symbol"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
