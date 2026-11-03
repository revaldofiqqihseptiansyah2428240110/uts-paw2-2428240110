const express = require("express");
const router = express.Router();
const sesifotoController = require("../controllers/sesifotoController");

router.get("/", sesifotoController.getAllsesifoto);
router.get("/:id", sesifotoController.getsesifotoById);
router.post("/", sesifotoController.createsesifoto);
router.put("/:id", sesifotoController.updatesesifoto);
router.delete("/:id", sesifotoController.deletesesifoto);

module.exports = router;