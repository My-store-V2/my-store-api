const jwt = require('jsonwebtoken');

function signJwt(payload) {
  console.log(payload);
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { signJwt };
