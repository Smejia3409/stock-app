import Form from "react-bootstrap/Form";
import { searchReducer, StockState } from "./reducer";
import { useContext, useReducer, useRef, useState } from "react";
import { StockContext } from "./Context";

const SearchBar = () => {
  const [state, dispatch] = useReducer(searchReducer, StockState);
  const stockRef = useRef<any>();

  const { stock, setStock } = useContext<any>(StockContext);
  const [stockInput, setstockInput] = useState<String>("");

  const findStock = (stockEvent: React.FormEvent<HTMLFormElement>) => {
    stockEvent.preventDefault();
    console.log(state?.keyword);
    setStock(stockInput);
  };

  console.log(stock);

  return (
    <div className="container">
      <Form style={{ width: "33%" }} onSubmit={findStock}>
        <Form.Group>
          <Form.Control
            onChange={(e) => {
              setstockInput(e.target.value);
            }}
            type="text"
            placeholder="Search Stock"
          />
        </Form.Group>

        <button type="submit">submit</button>
      </Form>

      <p>{stock}</p>
    </div>
  );
};

export default SearchBar;