const jwt = require("jsonwebtoken");

function signJwt(payload) {
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { signJwt };