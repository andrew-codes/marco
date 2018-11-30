const http = require('http');
const print = require('prettyjson').render;
require('http-shutdown').extend();
const FORM_URLENCODED = 'application/x-www-form-urlencoded';

module.exports = port => {
  const server = http
    .createServer((req, res) => {
      if (req.method === 'POST') {
        getBody(req).then(body => {
          console.log('Incoming Request Body ----------');
          console.log(print(JSON.parse(body)));
        });
      }
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
