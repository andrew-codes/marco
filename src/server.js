const http = require('http');
const { parse } = require('querystring');
const print = require('prettyjson').render;
require('http-shutdown').extend();
const FORM_URLENCODED = 'application/x-www-form-urlencoded';

module.exports = port => {
  const server = http
    .createServer((req, res) => {
      if (req.method === 'POST') {
        getBody(req).then(body => {
          console.log('--- Begin Request ----------');
          console.log('--- Headers ---');
          console.log(print(req.headers));
          console.log('--- Body ---');
          if (request.headers['content-type'] === FORM_URLENCODED) {
            console.log(print(parse(body)));
            return;
          } else {
            console.log(print(JSON.parse(body)));
          }
        });
      }
      console.log('--- End Request ----------');
      res.end('ok');
    })
    .withShutdown();

  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return server;
};

function getBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
  });
}
