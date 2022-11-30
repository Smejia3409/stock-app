import Form from "react-bootstrap/Form";
import { searchReducer, StockState } from "./reducer";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { StockContext, StockDetails } from "./Context";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

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
    // if (companies) {
    //   console.log(typeof companies);
    // }
  }, [companies]);

  return (
    <div className="container h-25">
      <Form style={{ width: "100%" }} onSubmit={findStock}>
        <Form.Group>
          <Form.Control
            onChange={(e) => {
              setStockInput(e.target.value);
            }}
            type="text"
            placeholder="Search Stock"
          />
        </Form.Group>
        <div
          style={{
            overflowY: "auto",
            height: "25%",
          }}
        >
          {showlist && (
            <StockResults stockList={companies} changeDisplay={setShowList} />
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </Form>
    </div>
  );
};

const StockResults = (props: { stockList: Array<any>; changeDisplay: any }) => {
  interface IModal {
    modalDisplay: boolean;
    modalMessage: string;
  }

  const { stock, setStock } = useContext<any>(StockContext);

  const { stockDetails, setStockDetails } = useContext<any>(StockDetails);

  const [modalSettings, setModalSettings] = useState<IModal>({
    modalDisplay: true,
    modalMessage: "",
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
      console.error(error);
      setModalSettings({
        modalMessage: "Stock not found, Error occured with API",
        modalDisplay: true,
      });
    }
  };

  return (
    <>
      {/* <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Erorr</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{modalSettings.modalMessage}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalSettings({ ...modalSettings, modalDisplay: false });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      {props.stockList.map((company: any) => {
        const region = company["1. symbol"].substring(
          company["1. symbol"].indexOf(".") + 1
        );
        return (
          <Dropdown.Item
            key={company["2. name"] + company["1. symbol"]}
            style={{
              width: "18 rem",
              overflowY: "scroll",
              height: "8 rem",
              zIndex: 7,
            }}
            onClick={() => {
              console.log(company["1. symbol"]);
              props.changeDisplay(false);
              setStock({
                symbol: company["1. symbol"],
                companyName: company["2. name"],
              });
              setStockInfo(company["1. symbol"]);
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
