var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function solution() {
    return new Promise((resolve, reject) => {
        let myUrl = 'https://static.ngnrs.io/test/prices';
        let xhr = new XMLHttpRequest();
        xhr.open("GET", myUrl, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                // console.log('xhr response = ' + xhr.responseText);
                jsonResponse = JSON.parse(xhr.responseText);
                priceObj = jsonResponse['data']['prices']
                priceObj.forEach(x => {
                    x.mid = function() {
                        return (x.sell + x.buy) / 2;
                    }
                    x.quote = function() {
                        if (x.pair.endsWith('USD')) {
                            return 'USD';
                        }
                        return 'SGD';
                    }
                });
                resolve(priceObj);
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          };
          xhr.onerror = function () {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          };
          xhr.send();
    })
}

var ds = {
    getPrices : solution
}

ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.error(error);
    });