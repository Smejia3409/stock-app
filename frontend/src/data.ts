import axios from "axios";
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
    "X-RapidAPI-Key": "40c18545dfmshd6b127ed3b5e3adp182eefjsne60db23d61ca",
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  },
};

export const data_fetch = async (setdata: any) => {
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
