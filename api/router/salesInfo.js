const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")

const SaleController = require("../controllers/salesInfo")

router.get("/", SaleController.salesInfo_get_all )



/* GET /sales - Pobiera wszystkie sprzedaże z danymi klientów i samochodów
router.get('/salesInfo', async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate({
        path: 'car_id',
        select: 'mark model year price' // Pola z kolekcji `cars`
      })
      .populate({
        path: 'customer_id',
        select: 'name phone email address' // Pola z kolekcji `customers`
      });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania sprzedaży.', details: error.message });
  }
});*/

module.exports = router;
