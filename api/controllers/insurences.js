const Insurence = require("../models/insurence");
const mongoose = require("mongoose")

exports.insurences_get_all = async (req, res, next) => {
    try {
        const insurences = await Insurence.find()
            .populate({
                path: 'car_id',
                model: 'Car',
                select: 'mark model year price'
            })
            .populate({
                path: 'client_id',
                model: 'Client',
                select: 'name phone email address'
            });

        res.status(200).json(insurences);
    } catch (error) {
        res.status(500).json({
            error: 'Wystąpił błąd podczas pobierania ubezpieczenia.',
            details: error.message
        });
    }
};



exports.insurences_add_new = (req, res, next) => {
    const insurence = new Insurence({
        _id: new mongoose.Types.ObjectId(),
        car_id:req.body.car_id,
        client_id:req.body.client_id
    })
    insurence.save()
    .then(result=>{
        res.status(201).json({
            wiadomość: "utworzenie nowego ubezpieczenia",
            dane: result
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.insurences_get_by_id = (req, res, next) => {
    const id = req.params.insurenceId;

    Insurence.findById(id)
    .populate({
        path: 'car_id', 
        model: 'Car', 
        select: 'mark model year price' 
      })
    .populate({
        path: 'client_id', 
        model: 'Client', 
        select: 'name phone email address' 
      })
    .then(result => {
        if (result) {
            res.status(200).json({
                wiadomość: "Szczegóły ubezpieczenia o numerze " + id,
                dane: result
            });
        } else {
            res.status(404).json({
                wiadomość: "Nie znaleziono ubezpieczenia o numerze " + id
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            wiadomość: "Wystąpił błąd podczas wyszukiwania ubezpieczenia",
            błąd: err.message
        });
    });
};

exports.insurences_update = (req, res, next) => {
    const id = req.params.insurenceId
    Insurence.findByIdAndUpdate(id, {
        car_data:req.body.car_data,
        client_data:req.body.client_data
  })
    .then(()=> {
        res.status(200).json({wiadomość: "Zmiana zmmiana ubezepiczenia auta o numerze " 
        + id}) 
    })
}

exports.delete_insurence_by_id = (req,res,next)=>{
    const id = req.params.insurenceId
    Insurence
    .findByIdAndDelete(id)
    .then(()=>
    res.status(200).json({wiadomość:"Usunięcie ubezepieczenua o podanym id" +id}))
}

exports.insurences_get_by_client_id = (req, res, next) => {
    const clientId = req.params.clientId;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).json({
            wiadomość: "Nieprawidłowy format ID klienta"
        });
    }

    Insurence.find({ client_data: clientId })
        .populate('client_data', 'name phone email street city postal_code') 
        .populate('car_data', 'mark model year price')
        .then(results => {
            if (results.length > 0) {
                res.status(200).json({
                    wiadomość: `Znaleziono ubezpieczenia dla klienta o ID: ${clientId}`,
                    dane: results
                });
            } else {
                res.status(404).json({
                    wiadomość: `Nie znaleziono ubezpieczeń dla klienta o ID: ${clientId}`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                wiadomość: "Wystąpił błąd podczas wyszukiwania ubezpieczeń",
                błąd: err.message
            });
        });
};

