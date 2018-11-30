#!/usr/bin/env node

const ON_DEATH = require('death');
const createServer = require('./../server');
const argv = require('yargs').command(
  'marco [port]',
  'start the server',
  yargs => {
    yargs.positional('port', {
      describe: 'port to bind on',
      default: 8080,
    });
  },
).argv;
const port = argv._[0];

let server;

ON_DEATH((signal, err) => {
  if (!server) {
    process.exit();
  }
  console.log('Gracefully, shutting down server');
  server.shutdown(() => {
    console.log('Everything is cleanly shutdown.');
    process.exit();
  });
});

server = createServer(port);
