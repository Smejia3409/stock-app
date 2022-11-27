export function getSymbolCookie() {
  let cookie: any = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie["symbols"];
}

export const addSymbol = (symbol: string) => {
  let cookie: Array<string> = getSymbolCookie().split(",");

  // if (!getSymbolCookie()) {
  //   console.log("no cookie");
  //   let arr = [symbol];
  //   document.cookie = `symbols=` + arr;
  // } else {
  //   let arr = [symbolArr];
  //   if (arr.includes(symbol)) {
  //     console.log("already inclued");
  //   } else {
  //     arr.push(symbol);
  //   }
  //   document.cookie = `symbols=` + arr;
  // }

  if (cookie.includes(symbol)) {
    console.log(symbol + " is already included in favoirtes");
    alert("alreadu in");
  } else if (!cookie.includes(symbol)) {
    cookie.push(symbol);
    document.cookie = `symbols=` + cookie;
  } else {
    document.cookie = `symbols=`;
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
