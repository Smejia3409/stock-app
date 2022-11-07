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
          Open:{props.open} <br />
          High:{props.high} <br />
          low:{props.low}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
