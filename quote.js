const request = require("request");

const url = 'https://www.mizuhobank.co.jp/market/csv/quote.csv';
const today = new Date();
const thisMonth = today.getFullYear() + '/' + (today.getMonth() + 1);

String.prototype.indexOf2nd = function(searchValue) {
  return this.indexOf(searchValue, this.indexOf(searchValue)+1);
};

String.prototype.sliceTo2nd = function(targetValue) {
  return this.slice(0, this.indexOf2nd(targetValue));
};

module.exports = (callback) => {
  request(url, (error, response, body) => {
    console.log('quote');
    if (error) throw error;
    const b = body.trim().split('\r\n');
    
    let index;
    for (let i = b.length-1; i >= 0; i--) {
      if (!b[i].startsWith(thisMonth)) {
        index = i;
        break;
      }
    }
    
    const l = b.slice(index, index+3);
    const res = l.map(x => x.sliceTo2nd(',')).join('\r\n');
    // console.log(res);
    callback(res);
    console.log('callback done');
  });
};