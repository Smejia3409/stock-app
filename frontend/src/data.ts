import axios from "axios";
//gets stock data
// const dotenv = require("dotenv").config();

const config: Object = {
  params: {
    interval: "1min",
    function: "TIME_SERIES_INTRADAY",
    symbol: "AAPL",
    datatype: "json",
    output_size: "compact",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_PRIVATE_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_API_URL,
  },
};

export const get_stock_data = async (setdata: any) => {
  try {
    let { data: stock_data } = await axios.get(
      "https://alpha-vantage.p.rapidapi.com/query",
      config
    );
    setdata(stock_data);
  } catch (error) {
    console.log(error);
  }
};

export const get_stock_symbols = async (stock: string) => {
  let url: string = "https://alpha-vantage.p.rapidapi.com/query";
  let config: Object = {
    params: {
      keywords: stock,
      function: "SYMBOL_SEARCH",
      datatype: "json",
    },
    headers: {
      "X-RapidAPI-Key": "40c18545dfmshd6b127ed3b5e3adp182eefjsne60db23d61ca",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };
  try {
    let { data: compaines } = await axios.get(url, config);
    console.log(compaines["bestMatches"]);

    return compaines;
  } catch (error) {}
};
