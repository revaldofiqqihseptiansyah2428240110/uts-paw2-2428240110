const express = require("express");
const router = express.Router();
const sesifotoController = require("../controllers/sesifotoController");

router.get("/", sesifotoController.getAllSesifoto);
router.get("/:id", sesifotoController.getSesifotoById);
router.post("/", sesifotoController.createSesifoto);
router.put("/:id", sesifotoController.updateSesifoto);
router.delete("/:id", sesifotoController.deleteSesifoto);

module.exports = router;