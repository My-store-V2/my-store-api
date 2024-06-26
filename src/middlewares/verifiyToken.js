const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {

  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      error: 403,
      auth: false,
      token: null,
      message:"Missing token"
    })
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, jwtDecoded) {
    if (error) {
      return res.status(401).send({
        error: 401,
        auth: false,
        token: null,
        message:"none authorized"
      })
    }
    req.userToken = jwtDecoded;
    next();
  })
}

module.exports = verifyToken;