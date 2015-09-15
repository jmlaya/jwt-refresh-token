// Generated by CoffeeScript 1.9.2
(function() {
  var jwt;

  jwt = require('jsonwebtoken');

  module.exports = {
    refresh: function(token, secretOrPrivateKey, options) {
      var err, limitDate, payload;
      payload = void 0;
      try {
        payload = jwt.decode(token);
      } catch (_error) {
        err = _error;
        return new jwt.JsonWebTokenError("invalid token");
      }
      if (typeof options === "undefined") {
        options = {};
      }
      if (typeof payload.exp !== "undefined") {
        if (typeof options.toleranceDays === "undefined") {
          options.toleranceDays = 7;
        }
        limitDate = new Date(payload.exp * 1000);
        limitDate.setDate(limitDate.getDate() + options.toleranceDays);
        if (Math.floor(Date.now() / 1000) >= Math.floor(limitDate / 1000)) {
          return new jwt.TokenExpiredError('jwt expired', new Date(payload.exp * 1000));
        } else {
          return jwt.sign(payload, secretOrPrivateKey, options);
        }
      } else {
        return token;
      }
    }
  };

}).call(this);
