import React, { useEffect, useState } from "react";
import { data_fetch } from "./data";
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

  // };

  useEffect(() => {
    data_fetch(setData);
  }, [data_fetch]);
  console.log(data);

  // console.log(data.data["Meta Data"]["2. Symbol"]);

  // data_fetch();
  return (
    <div className="container">
      <p>Stock follower</p>
      {loading && <LoadingScreen />}

      {data && (
        <div>
          <p>{data["Meta Data"]["2. Symbol"]}</p>
          <p>{data["Meta Data"]["Time Series (1min)"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
