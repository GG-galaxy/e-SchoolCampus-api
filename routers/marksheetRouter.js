// import controllers
const marksheetController = require("../controllers/marksheetController.js");

// router
const router = require("express").Router();

router.get("/all", marksheetController.getAllMarksheets);

router.get("/:id", marksheetController.getOneMarksheet);

router.post("/", marksheetController.addMarksheet);

router.put("/:id", marksheetController.updateMarksheet);

router.delete("/:id", marksheetController.deleteMarksheet);

module.exports = router;
