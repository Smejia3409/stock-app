import React, { useEffect, useState } from "react";
import { data_fetch } from "./data";

function App() {
  const [stock, setStock] = useState<String>("Googl");
  const [data, setData] = useState<any>([]);
  useEffect(() => {});

  useEffect(() => {}, []);

  setTimeout(() => {
    let res = data_fetch(stock);
    console.log(res);
  }, 1000);

  return (
    <div className="container">
      <p>Stock follower</p>
    </div>
  );
}

export default App;
