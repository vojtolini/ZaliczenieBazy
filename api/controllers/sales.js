const Sale = require("../models/sale")
const Client = require("../models/client")
const mongoose = require("mongoose")

exports.sales_get_all = async (req, res, next) => {
    try {
        const sales = await Sale.find()
          .populate({
            path: 'car_id', 
            model: 'Car', 
            select: 'mark model year price' 
          })
          .populate({
            path: 'client_id', 
            model: 'Client', 
            select: 'firstName secondName phone email street city postal_code' 
          });

        const salesWithCarPrice = sales.map(sale => ({
          id: sale._id,
          date: sale.date,
          status: sale.status,
          sell_value: sale.car_id.price,
          car: {
            id: sale.car_id._id,
            mark: sale.car_id.mark,
            model: sale.car_id.model,
            year: sale.car_id.year,
            price: sale.car_id.price
          },
          client: {
            id: sale.client_id._id,
            firstName: sale.client_id.firstName,
            secondName: sale.client_id.secondName,
            phone: sale.client_id.phone,
            email: sale.client_id.email,
            street: sale.client_id.street,
            city: sale.client_id.city,
            postal_code: sale.client_id.postal_code
          },
        }));

        res.status(200).json(salesWithCarPrice);
    } catch (error) {
        res.status(500).json({
          error: 'Wystąpił błąd podczas pobierania sprzedaży.',
          details: error.message
        });
    }
};

exports.sales_get_by_id = async (req, res, next) => {
    const id = req.params.saleId;

    try {
        const sale = await Sale.findById(id)
            .populate({
                path: 'car_id',
                model: 'Car',
                select: 'mark model year price'
            })
            .populate({
                path: 'client_id',
                model: 'Client',
                select: 'name phone email street city postal_code'
            });

        if (sale) {
            const saleWithCarPrice = {
                id: sale._id,
                date: sale.date,
                status: sale.status,
                sell_value: sale.car_id.price,
                car: {
                    id: sale.car_id._id,
                    mark: sale.car_id.mark,
                    model: sale.car_id.model,
                    year: sale.car_id.year,
                    price: sale.car_id.price
                },
                client: {
                    id: sale.client_id._id,
                    firstName: sale.client_id.firstName,
                    secondName: sale.client_id.secondName,
                    phone: sale.client_id.phone,
                    email: sale.client_id.email,
                    street: sale.client_id.street,
                    city: sale.client_id.city,
                    postal_code: sale.client_id.postal_code
                }
            };

            res.status(200).json(saleWithCarPrice);
        } else {
            res.status(404).json({
                message: `Nie znaleziono sprzedaży o numerze ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Wystąpił błąd podczas wyszukiwania sprzedaży",
            error: err.message
        });
    }
};

exports.sales_get_by_client_id = async (req, res, next) => {
    const clientId = req.params.clientId;

    try {
        const sales = await Sale.find({ client_id: clientId })
            .populate({
                path: 'car_id',
                model: 'Car',
                select: 'mark model year price'
            })
            .populate({
                path: 'client_id',
                model: 'Client',
                select: 'firstName secondName phone email street city postal_code'
            });

        if (sales) {
            const salesWithCarPrice = sales.map(sale => ({
                id: sale._id,
                date: sale.date,
                status: sale.status,
                sell_value: sale.car_id.price,
                car: {
                    id: sale.car_id._id,
                    mark: sale.car_id.mark,
                    model: sale.car_id.model,
                    year: sale.car_id.year,
                    price: sale.car_id.price
                },
                client: {
                    id: sale.client_id._id,
                    firstName: sale.client_id.firstName,
                    secondName: sale.client_id.secondName,
                    phone: sale.client_id.phone,
                    email: sale.client_id.email,
                    street: sale.client_id.street,
                    city: sale.client_id.city,
                    postal_code: sale.client_id.postal_code
                }
            }));

            res.status(200).json(salesWithCarPrice);
        } else {
            res.status(404).json({
                message: `Nie znaleziono sprzedaży dla klienta o numerze ${clientId}`
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Wystąpił błąd podczas wyszukiwania sprzedaży",
            error: err.message
        });
    }
};

exports.sales_get_by_client_name = async (req, res, next) => {
    const { firstName, secondName } = req.query;

    if (!firstName || !secondName) {
        return res.status(400).json({
            message: "Należy podać zarówno imię, jak i nazwisko klienta"
        });
    }

    try {
        const client = await Client.findOne({ firstName, secondName });

        if (!client) {
            return res.status(404).json({
                message: `Nie znaleziono klienta o imieniu: ${firstName} i nazwisku: ${secondName}`
            });
        }

        const sales = await Sale.find({ client_id: client._id })
            .populate({
                path: 'car_id',
                model: 'Car',
                select: 'mark model year price'
            })
            .populate({
                path: 'client_id',
                model: 'Client',
                select: 'firstName secondName phone email street city postal_code'
            });

        if (sales.length === 0) {
            return res.status(404).json({
                message: `Nie znaleziono sprzedaży dla klienta: ${firstName} ${secondName}`
            });
        }

        const salesWithCarPrice = sales.map(sale => ({
            id: sale._id,
            date: sale.date,
            status: sale.status,
            sell_value: sale.car_id.price,
            car: {
                id: sale.car_id._id,
                mark: sale.car_id.mark,
                model: sale.car_id.model,
                year: sale.car_id.year,
                price: sale.car_id.price
            },
            client: {
                id: sale.client_id._id,
                firstName: sale.client_id.firstName,
                secondName: sale.client_id.secondName,
                phone: sale.client_id.phone,
                email: sale.client_id.email,
                street: sale.client_id.street,
                city: sale.client_id.city,
                postal_code: sale.client_id.postal_code
            }
        }));

        res.status(200).json(salesWithCarPrice);
    } catch (error) {
        res.status(500).json({
            message: "Wystąpił błąd podczas wyszukiwania sprzedaży",
            error: error.message
        });
    }
};


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
        res.status(200).json({wiadomość: "Zmiana danych sprzedaży o numerze " 
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