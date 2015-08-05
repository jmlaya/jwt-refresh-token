// Generated by CoffeeScript 1.9.2
(function() {
  var jwt;

  jwt = require('jsonwebtoken');

  module.exports = {
    refresh: function(token, secretOrPrivateKey, options) {
      var decodedToken, err, limitDate, payload;
      decodedToken = void 0;
      try {
        decodedToken = jwt.decode(token);
      } catch (_error) {
        err = _error;
        return new jwt.JsonWebTokenError("invalid token");
      }
      payload = decodedToken.payload;
      if (!decodedToken) {
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
          return jwt.sign(payload, process.env.TOKEN_SECRET || "oursecret", {
            expiresInMinutes: 1
          });
        }
      } else {
        return token;
      }
    }
  };

}).call(this);
