const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler
const SaleController = require("../controllers/sales")

router.get("/",checkAuth, SaleController.sales_get_all )

router.post("/", checkAuth, SaleController.sales_add_new )

router.get("/:saleId",checkAuth, SaleController.sales_get_by_id )

router.get("/client/:clientId", checkAuth, SaleController.sales_get_by_client_id)

router.get("/client/byname/name", checkAuth, SaleController.sales_get_by_client_name)

router.put("/:saleId",checkAuth, SaleController.sales_update )

router.delete("/:saleId",checkAuth, SaleController.sales_delete )

module.exports = router