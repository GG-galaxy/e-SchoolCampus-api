// import controllers
const authController = require("../controllers/authController.js");

// router
const router = require("express").Router();

router.get("/:id", authController.getUser);

module.exports = router;
