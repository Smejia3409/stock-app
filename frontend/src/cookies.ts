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
    console.log("no coolie");
    let arr = [symbol];
    document.cookie = `symbols=` + arr;
  } else {
    let arr = [symbolArr];
    if (!arr.includes(symbol)) {
      arr.push(symbol);
    }
    document.cookie = `symbols=` + arr;
  }
};
