import Card from "react-bootstrap/Card";
import { AiOutlinePlus } from "react-icons/ai";
import { addSymbol, getSymbolCookie } from "./cookies";

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

  let cookie = getSymbolCookie().split(",");
  cookie.forEach((s: string) => {
    symbols.push(s);
  });

  console.log(symbols);

  return (
    <div>
      {symbols.map((symbol: string) => {
        return (
          <button key={symbol} className="btn btn-primary">
            {symbol}
          </button>
        );
      })}
    </div>
  );
};
