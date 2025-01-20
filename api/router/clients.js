const express = require("express")
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")

const ClientController = require("../controllers/clients")

router.get("/",checkAuth, ClientController.clients_get_all )

router.post("/", checkAuth, ClientController.clients_add_new )

router.get("/:clientId",checkAuth, ClientController.clients_get_by_id )

router.get('/byname/name', checkAuth, ClientController.clients_get_by_name);

router.put("/:clientId",checkAuth, ClientController.clients_update )

router.delete("/:clientId",checkAuth, ClientController.clients_delete )

module.exports = router