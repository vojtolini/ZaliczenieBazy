const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler
const ClientController = require("../controllers/clients")

router.get("/", ClientController.clients_get_all )

router.post("/", checkAuth, ClientController.clients_add_new )

router.get("/:clientId", ClientController.clients_get_by_id )

router.put("/:clientId", ClientController.clients_update )

router.delete("/:clientId", ClientController.clients_delete )

module.exports = router