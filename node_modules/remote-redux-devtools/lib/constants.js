'use strict';

exports.__esModule = true;
var defaultSocketOptions = exports.defaultSocketOptions = {
  protocol: 'http',
  hostname: 'remotedev.io',
  port: 80,
  autoReconnect: true,
  autoReconnectOptions: {
    randomness: 60000
  }
};