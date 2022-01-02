// import controllers
const batchController = require("../controllers/batchController.js");

// router
const router = require("express").Router();

router.get("/all", batchController.getAllBatches);

router.get("/:id", batchController.getOneBatch);

router.post("/", batchController.addBatch);

router.post("/add/teacher", batchController.addBatchTeachers);

router.put("/:id", batchController.updateBatch);

router.delete("/:id", batchController.deleteBatch);

module.exports = router;
