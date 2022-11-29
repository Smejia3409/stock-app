import Card from "react-bootstrap/Card";
import { AiOutlinePlus } from "react-icons/ai";
import { addSymbol, getSymbolCookie, removeSymbol } from "./cookies";
import axios from "axios";
import { StockContext, StockDetails } from "./Context";
import { useContext } from "react";

const Cards = (props: {
  name: string;
  symbol: string;
  open: string;
  high: string;
  low: string;
  date: string;
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className="row ">
          <Card.Title className="col-10">{props.symbol}</Card.Title>
          <Card.Subtitle>{props.name}</Card.Subtitle>
          <button
            className="btn btn-success col-2 "
            onClick={() => {
              console.log(props.symbol);
              addSymbol(props.symbol);
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <Card.Text>
          <span>Last Refreshed</span> <br />
          {new Date(props.date).toLocaleString()}
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
  let symbols: Array<Object> = [];
  const { stockDetails, setStockDetails } = useContext<any>(StockDetails);
  const { stock, setStock } = useContext<any>(StockContext);

  // //turns the string into json
  // let cookie = JSON.parse(getSymbolCookie());

  // cookie.forEach((s: string) => {
  //   symbols.push(s);
  // });

  // cookie.array.forEach((favorite: any) => {
  //   symbols.push(favorite);
  // });

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

  console.log(symbols);

  return (
    <div>
      {/* {symbols.map((symbol: object) => {
        return (
          <button
            key={symbol["symbol"]}
            className="btn btn-primary"
            onClick={() => {
              setStockInfo(symbol["symbol"]);
            }}
          >
            {symbol["symbol"]}
          </button>
        );
      })} */}

      <p>stock</p>
    </div>
  );
};
