const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Sprawdź, czy nagłówek Authorization jest obecny
    const authHeader = req.headers.authorization;

    // Jeśli nagłówek nie istnieje, zwróć odpowiedź z kodem 401
    if (!authHeader) {
        return res.status(401).json({ wiadomosc: "Brak nagłówka Authorization" });
    }

    // Podziel nagłówek Authorization na część z tokenem
    const token = authHeader.split(" ")[1];

    // Jeśli token nie jest dostępny, zwróć odpowiedź z kodem 401
    if (!token) {
        return res.status(401).json({ wiadomosc: "Brak tokenu w nagłówku Authorization" });
    }

    try {
        // Weryfikuj token
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (err) {
        // Jeśli weryfikacja nie powiedzie się, zwróć odpowiedź z kodem 401
        return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });
    }
};
