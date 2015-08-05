jwt = require('jsonwebtoken')

module.exports =
  refresh: (token, secretOrPrivateKey, options)->
    payload = undefined
    try
      payload = jwt.decode(token)
    catch err
      return new jwt.JsonWebTokenError("invalid token")

    return new jwt.JsonWebTokenError("invalid token") unless decodedToken

    options = {} if typeof options is "undefined"

    if typeof payload.exp isnt "undefined"
      options.toleranceDays = 7 if typeof options.toleranceDays is "undefined"
      limitDate = new Date(payload.exp * 1000)
      limitDate.setDate(limitDate.getDate() + options.toleranceDays);

      if Math.floor(Date.now() / 1000) >= Math.floor(limitDate / 1000)
        return new jwt.TokenExpiredError('jwt expired', new Date(payload.exp * 1000))
      else
        return jwt.sign payload, process.env.TOKEN_SECRET or "oursecret", {expiresInMinutes: 1}
    else
      return token

