const express = require("express")
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")

const CarController = require("../controllers/cars")

router.get("/",checkAuth, CarController.cars_get_all )

router.post("/", checkAuth, CarController.cars_add_new )

router.get("/:carId",checkAuth, CarController.cars_get_by_id )

router.put("/:carId",checkAuth, CarController.cars_update )

router.delete("/:carId",checkAuth, CarController.cars_delete )

module.exports = router