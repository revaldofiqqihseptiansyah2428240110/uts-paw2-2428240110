const express = require("express");
const router = express.Router();
const fotograferController = require("../controllers/fotograferController");

router.get("/", fotograferController.getAllFotografer);
router.get("/:id", fotograferController.getFotografer);
router.post("/", fotograferController.createFotografer);
router.put("/:id", fotograferController.updateFotografer);
router.delete("/:id", fotograferController.deleteFotografer);

module.exports = router;