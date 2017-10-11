const http = require('http');
const url = require('url');
const handlers = require('./handlers/handlerBlender');
const db = require('./config/dataBase');
const port = 2323;

db.load().then(() => {
  http
    .createServer((req, res) => {

      req.pathname = url.parse(req.url).pathname;

      for (let handler of handlers) {
        let task = handler(req, res);
        if (task !== true) {
          break;
        }
      }
    })
    .listen(port);
  console.log('Im listening on ' + port);
}).catch(() => {
  console.log('Failed to load DB');
})
