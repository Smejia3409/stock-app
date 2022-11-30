export function getSymbolCookie() {
  let cookie: any = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie["symbols"];
}

export const addSymbol = (symbol: string, companyName: string) => {
  let symbolArr = getSymbolCookie();

  let newSymbol = { symbol: symbol, companyName: companyName };

  if (!getSymbolCookie()) {
    console.log("no cookie");
    let arr: Array<object> = [newSymbol];

    console.log(JSON.stringify(arr));
    document.cookie = `symbols=` + JSON.stringify(arr);
  } else {
    let savedSymbols: string = getSymbolCookie();

    let symbolList: Array<object> = JSON.parse(savedSymbols);

    console.log(symbolList);

    //go through each saved symbol objects to make sure new symbol don't exist
    if (!symbolList.includes(newSymbol)) {
      symbolList.push(newSymbol);
    }

    console.log(symbolList);

    document.cookie = `symbols=` + JSON.stringify(symbolList);
  }
};

export const removeSymbol = (symbol: string) => {
  //array of favorite symbols
  let cookie: Array<string> = getSymbolCookie().split(",");

  let symbolIndex = cookie.indexOf(symbol);

  cookie.splice(symbolIndex, 1);

  document.cookie = `symbols = ${cookie}`;
};

export const deleteFavorites = () => {
  document.cookie = `symbols = `;
};
