const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler
const SaleController = require("../controllers/sales")

router.get("/", SaleController.sales_get_all )

router.post("/", checkAuth, SaleController.sales_add_new )

router.get("/:saleId", SaleController.sales_get_by_id )

router.put("/:saleId", SaleController.sales_update )

router.delete("/:saleId", SaleController.sales_delete )

module.exports = router