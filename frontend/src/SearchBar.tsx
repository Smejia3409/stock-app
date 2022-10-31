import Form from "react-bootstrap/Form";
import { searchReducer, StockState } from "./reducer";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { StockContext } from "./Context";
import Dropdown from "react-bootstrap/Dropdown";
import { get_stock_symbols } from "./data";

const SearchBar = () => {
  const { stock, setStock } = useContext<any>(StockContext);
  const [stockInput, setstockInput] = useState<string>("");
  const [companies, setCompanies] = useState<any>([]);

  const findStock = (stockEvent: React.FormEvent<HTMLFormElement>) => {
    stockEvent.preventDefault();
    get_stock_symbols(stockInput, setCompanies);
    get_stock_symbols(stockInput, setCompanies);
    console.log(companies);

    // setTimeout(() => {
    //   if (companies) {
    //     alert("yes");
    //     console.log(companies);
    //   }
    // }, 4000);
  };

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
    </div>
  );
};

const StockResults = (props: { stockList: Array<any> }) => {
  return (
    <Dropdown>
      <Dropdown.Menu>
        {props.stockList.map((company: any) => {
          return <Dropdown.Item></Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBar;
