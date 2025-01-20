const Car = require("../models/car")
const mongoose = require("mongoose")

exports.cars_get_all = (req, res, next) => {
    Car.find()
    .then(cars => {
        res.status(200).json({
            wiadomość: "lista wszystkich samochodów",
            lista: cars
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.cars_add_new = (req, res, next) => {
    const car = new Car({
        _id: new mongoose.Types.ObjectId(),
        mark:req.body.mark,
        model:req.body.model,
        year:req.body.year,
        price:req.body.price
    })
    car.save()
    .then(result=>{
        res.status(201).json({
            wiadomość: "utworzenie nowego auta",
            dane: result
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.cars_get_by_id = (req, res, next) => {
    const id = req.params.carId;

    Car.findById(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: "Szczegóły auta o numerze " + id,
                    dane: result
                });
            } else {
                res.status(404).json({
                    wiadomość: "Nie znaleziono auta o numerze " + id
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                wiadomość: "Wystąpił błąd podczas wyszukiwania auta",
                błąd: err.message
            });
        });
};


exports.cars_update = (req, res, next) => {
    const id = req.params.carId
    Car.findByIdAndUpdate(id, {
        mark:req.body.mark,
        model:req.body.model,
        year:req.body.year,
        price:req.body.price
  })
    .then(()=> {
        res.status(200).json({wiadomość: "Zmiana danych auta o numerze " 
        + id}) 
    })
}

exports.cars_delete = (req, res, next) => {
    const id = req.params.carId
    Car
    .findOneAndDelete(id)
    .then(() => {
        res.status(200).json({wiadomość: "Usunięcie produktu o numerze " + id})
    })
}