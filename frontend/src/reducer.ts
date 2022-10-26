import { useReducer } from "react";

const searchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "stock_name":
      return { name: state.name };
  }
};
