const cekApiKey = require("../middlewares/cekApiKey");
router.post("/", cekApiKey, roomController.createRoom);
router.put("/:id", cekApiKey, roomController.updateRoom);
router.delete("/:id", cekApiKey, roomController.deleteRoom);