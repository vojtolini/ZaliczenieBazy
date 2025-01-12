const Sale = require("../models/sale");
const Car = require("../models/car"); 
const Client = require("../models/client");

exports.salesInfo_get_all = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate({
        path: 'car_data', 
        model: 'Car', 
        select: 'mark model year price' 
      })
      .populate({
        path: 'client_data', 
        model: 'Client', 
        select: 'name phone email address' 
      });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      error: 'Wystąpił błąd podczas pobierania sprzedaży.',
      details: error.message
    });
  }
};
