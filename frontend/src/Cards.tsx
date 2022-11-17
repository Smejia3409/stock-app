import Card from "react-bootstrap/Card";
import { AiOutlinePlus } from "react-icons/ai";
import { addSymbol, getSymbolCookie, removeSymbol } from "./cookies";
import axios from "axios";
import { StockContext, StockDetails } from "./Context";
import { useContext } from "react";

const Cards = (props: {
  symbol: string;
  open: string;
  high: string;
  low: string;
  date: string;
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className="d-flex w-100 border border-danger">
          <Card.Title>{props.symbol}</Card.Title>
          <div className="">
            <button
              className="btn btn-success"
              onClick={() => {
                console.log(props.symbol);
                addSymbol(props.symbol);
              }}
            >
              {" "}
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <Card.Text>
          <span>Last Refreshed</span> <br />
          {props.date}
          <br />
          Open:{props.open} <br />
          High:{props.high} <br />
          low:{props.low}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;

export const FavoriteCards = () => {
  let symbols: Array<string> = [];
  const { stockDetails, setStockDetails } = useContext<any>(StockDetails);

  let cookie = getSymbolCookie().split(",");
  cookie.forEach((s: string) => {
    symbols.push(s);
  });

  const setStockInfo = async (stock: string) => {
    const config: Object = {
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

    try {
      let { data: stock_data } = await axios.get(
        "https://alpha-vantage.p.rapidapi.com/query",
        config
      );
      // setData(stock_data);
      console.log(stock_data);
      setStockDetails(stock_data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {symbols.map((symbol: string) => {
        return (
          <button
            key={symbol}
            className="btn btn-primary"
            onClick={() => {
              removeSymbol(symbol);
            }}
          >
            {symbol}
          </button>
        );
      })}
    </div>
  );
};
