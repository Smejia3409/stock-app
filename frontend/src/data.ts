import axios from "axios";
//gets stock data

export const data_fetch = (stock: String) => {
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      interval: "1min",
      function: "TIME_SERIES_INTRADAY",
      symbol: stock,
      datatype: "json",
      output_size: "compact",
    },
    headers: {
      "X-RapidAPI-Key": "40c18545dfmshd6b127ed3b5e3adp182eefjsne60db23d61ca",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return "Error";
    });
};
