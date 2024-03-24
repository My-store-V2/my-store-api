const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Si non, continuez sans authentification
        next();
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.payload;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authenticateUser;
