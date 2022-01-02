// import controllers
const adminController = require("../controllers/adminController.js");

// router
const router = require("express").Router();

router.get("/:id", adminController.getOneAdmin);

router.post("/", adminController.addAdmin);

router.put("/:id", adminController.updateAdmin);

router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
