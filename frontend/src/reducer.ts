export const StockState = {
  keyword: "",
};

export const searchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setStock":
      return { keyword: action.payload };

    case "emptyStock":
      return { keyword: "" };

    default:
      return state;
  }
};
