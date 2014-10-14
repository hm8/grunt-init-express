var bunyan = require('bunyan');

var config = {

  env: {
    port: 3100,
    secret: '6de5191ab3c401bcb266dff913',
    maxAge: 1000 * 60 * 60 * 72
  },

  mongo: './db/',

  log: {
    name: 'xx',
    streams: [{
      level: 'info',
      stream: process.stdout
    }, {
      level: 'error',
      path: __dirname + '/logs/error.log'
    }],
    serializers: {
      req: bunyan.stdSerializers.req
    }
  },

  db: 'mongodb://127.0.0.1/xx'
};

module.exports = config;