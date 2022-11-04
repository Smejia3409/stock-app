import Form from "react-bootstrap/Form";
import { searchReducer, StockState } from "./reducer";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { StockContext } from "./Context";
import Dropdown from "react-bootstrap/Dropdown";
import { get_stock_symbols } from "./data";
import axios from "axios";

const SearchBar = () => {
  const { stock, setStock } = useContext<any>(StockContext);
  const [stockInput, setStockInput] = useState<string>("");
  const [companies, setCompanies] = useState<any>([]);
  const [showlist, setShowList] = useState<boolean>(false);

  const findStock = (stockEvent: React.FormEvent<HTMLFormElement>) => {
    stockEvent.preventDefault();
    setStock(stockInput);
  };

  const get_stock_symbols = async (stock: string) => {
    let url: string = "https://alpha-vantage.p.rapidapi.com/query";
    let config: Object = {
      params: {
        keywords: stock,
        function: "SYMBOL_SEARCH",
        datatype: "json",
      },
      headers: {
        "X-RapidAPI-Key": "40c18545dfmshd6b127ed3b5e3adp182eefjsne60db23d61ca",
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };
    try {
      let { data: compaines } = await axios.get(url, config);
      if (compaines) {
        setCompanies(compaines["bestMatches"]);
        setShowList(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (stockInput !== "" && stockInput.length > 2) {
      get_stock_symbols(stockInput);
    }
  }, [stock]);

  useEffect(() => {
    if (companies) {
      console.log(typeof companies);
    }
  }, [companies]);

  return (
    <div className="container">
      <Form style={{ width: "50%" }} onSubmit={findStock}>
        <Form.Group>
          <Form.Control
            onChange={(e) => {
              setStockInput(e.target.value);
            }}
            type="text"
            placeholder="Search Stock"
          />
        </Form.Group>
        {showlist && (
          <StockResults stockList={companies} changeDisplay={setShowList} />
        )}
        <button type="submit">submit</button>
      </Form>
    </div>
  );
};

const StockResults = (props: { stockList: Array<any>; changeDisplay: any }) => {
  return (
    <>
      {props.stockList.map((company: any) => {
        const region = company["1. symbol"].substring(
          company["1. symbol"].indexOf(".") + 1
        );
        return (
          <Dropdown.Item
            key={company["2. name"] + company["1. symbol"]}
            onClick={() => {
              console.log(company["1. symbol"]);
              props.changeDisplay(false);
            }}
          >
            {company["2. name"] + "   " + region}
          </Dropdown.Item>
        );
      })}
    </>
  );
};

export default SearchBar;
