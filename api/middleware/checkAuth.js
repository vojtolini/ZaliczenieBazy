const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ wiadomosc: "Brak nagłówka Authorization" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ wiadomosc: "Brak tokenu w nagłówku Authorization" });
    }

    try {
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (err) {

        return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });
    }
};
