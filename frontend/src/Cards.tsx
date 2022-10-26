import Card from "react-bootstrap/Card";

const Cards = (props: {
  symbol: String;
  open: String;
  high: String;
  low: String;
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.symbol}</Card.Title>
        <Card.Text>
          {props.open} <br />
          {props.high} <br />
          {props.low}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
