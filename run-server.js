require('babel-polyfill');
require('babel-core/register');

const port = process.env.PORT || 3333;
const server = require('./app').server;

server.listen(port);
console.log(`Server start => port:${port}`);
