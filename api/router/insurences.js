const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")

const InsurenceController = require("../controllers/insurences")

router.get("/",checkAuth, InsurenceController.insurences_get_all )
router.post("/",checkAuth, InsurenceController.insurences_add_new)
router.get("/:insurenceId",checkAuth, InsurenceController.insurences_get_by_id)
router.delete("/:insurenceId",checkAuth, InsurenceController.delete_insurence_by_id)
router.put("/:insurenceId",checkAuth, InsurenceController.insurences_update)
router.get('/client/id/:clientId',checkAuth, InsurenceController.insurences_get_by_client_id)


module.exports = router;