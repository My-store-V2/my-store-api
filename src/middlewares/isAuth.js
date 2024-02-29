const jwt = require("jsonwebtoken");
const db = require("../models");

const isAuth = async (req, res, next) => {
    // Récupérer le token d'authentification depuis les en-têtes de la requête

    const authHeader = req.headers.authorization;

    // Vérifier si l'en-tête Authorization est présent
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    // Extraire le token en supprimant la partie "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    try {
        // Vérifier si le token est valide et obtenir les informations utilisateur
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        // Recherchez l'utilisateur dans la base de données en utilisant l'ID décodé
        //const user = await db.User.findByPk(decoded.payload);

        // if (!user) {
        //     return res.status(401).json({ message: "Utilisateur non trouvé" });
        // }

        // Stocker les informations utilisateur dans l'objet de requête pour une utilisation ultérieure
        req.user = decoded.payload;

        // Continuer vers la prochaine étape du middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = isAuth;