const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const User = require("../models/user");

const jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ wiadomosc: err });

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
        });

        user
            .save()
            .then(() => res.status(201).json({ wiadomosc: "Dodano użytkownika" }))
            .catch(err => res.status(500).json({ wiadomosc: err })); 
    });
});

router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ wiadomosc: "Błąd serwera", error: err });
                }

                if (!result) {
                    return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });
                }

                const token = jwt.sign(
                    { user: user._id, email: user.email },
                    process.env.JWT_KEY,
                    { expiresIn: "1d" }
                );

                res.status(200).json({
                    wiadomosc: "Zalogowano pomyślnie",
                    token: token
                });
            });
        })
        .catch(err => {
            return res.status(500).json({ wiadomosc: "Błąd serwera", error: err });
        });
});
module.exports = router