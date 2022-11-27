export function getSymbolCookie() {
  let cookie: any = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie["symbols"];
}

export const addSymbol = (symbol: string) => {
  let symbolArr = getSymbolCookie();

  if (!getSymbolCookie()) {
    console.log("no cookie");
    let arr = [symbol];
    document.cookie = `symbols=` + arr;
  } else {
    let arrList: Array<string> = getSymbolCookie().split(",");
    let arr = [symbolArr];

    if (!arrList.includes(symbol)) {
      arr.push(symbol);
    } else {
      alert("already included");
    }
    document.cookie = `symbols=` + arr;
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
