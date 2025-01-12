const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler
const CarController = require("../controllers/cars")

router.get("/", CarController.cars_get_all )

router.post("/", checkAuth, CarController.cars_add_new )

router.get("/:carId", CarController.cars_get_by_id )

router.put("/:carId", CarController.cars_update )

router.delete("/:carId", CarController.cars_delete )

module.exports = router