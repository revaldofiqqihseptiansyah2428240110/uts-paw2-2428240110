const cekApiKey = require("../middlewares/cekApiKey");
router.post("/", cekApiKey, sesifotoController.createSesifoto);
router.put("/:id", cekApiKey, roomController.updateSesifoto);
router.delete("/:id", cekApiKey, roomController.deleteSesifoto);