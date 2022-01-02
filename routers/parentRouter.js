// import controllers
const parentController = require("../controllers/parentController.js");

// router
const router = require("express").Router();

router.get("/:id", parentController.getOneParent);

router.post("/", parentController.addParent);

router.put("/:id", parentController.updateParent);

router.delete("/:id", parentController.deleteParent);

module.exports = router;
