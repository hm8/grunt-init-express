var bunyan = require('bunyan');

var config = {
  log: {
    name: 'xx-dev',
    src: true,
    streams: [{
      level: 'debug',
      stream: process.stdout
    }],
    serializers: {
      body: function(req) {
        if (!req)
          return req;
        return {
          url: req.method + ' ' + req.url,
          body: req.body,
          query: req.query,
          params: req.params
        };
      }
    }
  },

  db: 'mongodb://192.168.33.10/xx'
};

module.exports = config;