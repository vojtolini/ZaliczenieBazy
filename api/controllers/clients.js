const Client = require("../models/client")
const mongoose = require("mongoose")

exports.clients_get_all = (req, res, next) => {
    Client.find()
    .then(clients => {
        res.status(200).json({
            wiadomość: "lista wszystkich klientów",
            lista: clients
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.clients_add_new = async (req, res, next) => {
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        phone: req.body.phone,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        postal_code: req.body.postal_code
    });

    try {
        const result = await client.save();
        res.status(201).json({
            wiadomość: "Utworzono nowego klienta",
            dane: result
        });
    } catch (err) {
        res.status(500).json({
            wiadomość: "Wystąpił błąd podczas dodawania klienta.",
            szczegóły: err.message
        });
    }
};


exports.clients_get_by_id = (req, res, next) => {
    const id = req.params.clientId;

    Client.findById(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: "Szczegóły klienta o numerze " + id,
                    dane: result
                });
            } else {
                res.status(404).json({
                    wiadomość: "Nie znaleziono produktu o numerze " + id
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                wiadomość: "Wystąpił błąd podczas wyszukiwania produktu",
                błąd: err.message
            });
        });
};

exports.clients_get_by_name = (req, res, next) => {
    const { firstName, secondName } = req.query;

    if (!firstName || !secondName) {
        return res.status(400).json({
            wiadomość: "Brak wymaganych parametrów: firstName i/lub secondName"
        });
    }

    Client.findOne({ firstName: firstName, secondName: secondName })
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: `Szczegóły klienta o imieniu ${firstName} i nazwisku ${secondName}`,
                    dane: result
                });
            } else {
                res.status(404).json({
                    wiadomość: `Nie znaleziono klienta o imieniu ${firstName} i nazwisku ${secondName}`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                wiadomość: "Wystąpił błąd podczas wyszukiwania klienta",
                błąd: err.message
            });
        });
};



exports.clients_update = (req, res, next) => {
    const id = req.params.clientId
    Client.findByIdAndUpdate(id, {
        firstName:req.body.name,
        secondName: req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:{
        street: req.body.street,
        city: req.body.city,
        postal_code: req.body.postal_code
  }})
    .then(()=> {
        res.status(200).json({wiadomość: "Zmiana danych klienta o numerze " 
        + id}) 
    })
}

exports.clients_delete = (req, res, next) => {
    const id = req.params.clientId
    Client
    .findOneAndDelete(id)
    .then(() => {
        res.status(200).json({wiadomość: "Usunięcie klienta o numerze " + id})
    })
}