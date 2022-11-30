import Card from "react-bootstrap/Card";
import { AiOutlinePlus } from "react-icons/ai";
import { addSymbol, getSymbolCookie, removeSymbol } from "./cookies";
import axios from "axios";
import { StockContext, StockDetails } from "./Context";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";

const Cards = (props: {
  name: string;
  symbol: string;
  open: string;
  high: string;
  low: string;
  date: string;
}) => {
  const { stock, setStock } = useContext<any>(StockContext);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className="row g-2">
          <div className="col-10">
            <Card.Title>{props.symbol}</Card.Title>
            <Card.Subtitle>{props.name}</Card.Subtitle>
          </div>
          <button
            className="btn btn-success col-2 "
            onClick={() => {
              console.log(props.symbol);
              addSymbol(props.symbol, stock["companyName"]);
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
  interface ISymbol {
    symbol: string;
    companyName: string;
  }

  let symbols: Array<ISymbol> = JSON.parse(getSymbolCookie());
  const { stockDetails, setStockDetails } = useContext<any>(StockDetails);
  const { stock, setStock } = useContext<any>(StockContext);

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

  console.log(symbols[0].companyName);

  return (
    <>
      {/* {symbols.map((symbol: ISymbol) => {
        return (
          <div key={symbol.symbol} className="col w-100">
            <button
              className="btn btn-primary"
              onClick={() => {
                setStockInfo(symbol.symbol);
                setStock(symbol);
              }}
            >
              {symbol.companyName}
            </button>
            <br />
          </div>
        );
      })} */}

      <Dropdown style={{ paddingBottom: "5%" }}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Favorite Stocks
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {symbols.map((symbol: ISymbol) => {
            return (
              <Dropdown.Item
                className="btn btn-primary"
                onClick={() => {
                  setStockInfo(symbol.symbol);
                  setStock(symbol);
                }}
              >
                {symbol.companyName}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
