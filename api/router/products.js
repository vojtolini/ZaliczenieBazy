const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler
const ProductController = require("../controllers/products")

router.get("/", ProductController.products_get_all )

router.post("/", checkAuth, ProductController.products_add_new )

router.get("/:productId", ProductController.products_get_by_id )

router.put("/:productId", ProductController.products_update )

router.delete("/:productId", ProductController.products_delete )

module.exports = router