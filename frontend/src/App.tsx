import React, { useEffect, useState } from "react";
import { data_fetch } from "./data";
import LoadingScreen from "./LoadingScreen";

function App() {
  const [stock, setStock] = useState<String>("Googl");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const getData = async () => {
    try {
      let d: any = data_fetch("MSFT");

      console.log(d);
    } catch (error) {
      console.log(error);
    }
  };

  // const getData = async () => {
  //   let d = data_fetch("MSFT");
  //   console.log(d);
  //   setData(d);
  // };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="container">
      <p>Stock follower</p>
      {loading && <LoadingScreen />}
    </div>
  );
}

export default App;
