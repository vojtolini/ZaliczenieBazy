const Sale = require("../models/sale")
const mongoose = require("mongoose")

exports.sales_get_all = (req, res, next) => {
    Sale.find()
    .then(sales => {
        res.status(200).json({
            wiadomość: "lista wszystkich sprzedaży",
            lista: sales
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.sales_add_new = (req, res, next) => {
    const sale = new Sale({
        _id: new mongoose.Types.ObjectId(),
        car_id:req.body.car_id,
        client_id:req.body.client_id,
        date:req.body.date,
        price:req.body.price,
        status:req.body.status
    })
    sale.save()
    .then(result=>{
        res.status(201).json({
            wiadomość: "utworzenie nowej sprzedaży",
            dane: result
        })
    })
    .catch(err => res.status(500).json({wiadomość: err}))
}

exports.sales_get_by_id = (req, res, next) => {
    const id = req.params.saleId;

    Sale.findById(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: "Szczegóły sprzedaży o numerze " + id,
                    dane: result
                });
            } else {
                res.status(404).json({
                    wiadomość: "Nie znaleziono sprzedaży o numerze " + id
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                wiadomość: "Wystąpił błąd podczas wyszukiwania sprzedaży",
                błąd: err.message
            });
        });
};


exports.sales_update = (req, res, next) => {
    const id = req.params.saleId
    Sale.findByIdAndUpdate(id, {
        car_id:req.body.car_id,
        client_id:req.body.client_id,
        date:req.body.date,
        price:req.body.price,
        status:req.body.status
  })
    .then(()=> {
        res.status(200).json({wiadomość: "Zmiana danych auta o numerze " 
        + id}) 
    })
}

exports.sales_delete = (req, res, next) => {
    const id = req.params.saleId
    Sale
    .findOneAndDelete(id)
    .then(() => {
        res.status(200).json({wiadomość: "Usunięcie produktu o numerze " + id})
    })
}