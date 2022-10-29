import axios from "axios";
const dotenv = require("dotenv").config();
//gets stock data

const config: Object = {
  params: {
    interval: "1min",
    function: "TIME_SERIES_INTRADAY",
    symbol: "AAPL",
    datatype: "json",
    output_size: "compact",
  },
  headers: {
    "X-RapidAPI-Key": process.env.Key,
    "X-RapidAPI-Host": process.env.Host,
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

export const get_stock_symbols = async () => {
  let url: string = "https://alpha-vantage.p.rapidapi.com/query";
  let config: Object = {
    params: {
      keywords: "microsoft",
      function: "SYMBOL_SEARCH",
      datatype: "json",
    },
  };
  try {
    let { data: compaines } = await axios.get(url, config);
  } catch (error) {}
};
