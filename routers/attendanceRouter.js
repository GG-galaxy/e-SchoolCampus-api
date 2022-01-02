// import controllers
const attendanceController = require("../controllers/attendanceController.js");
const multer = require("multer");
const upload = multer();

const uploadFile = require("../utils/fileUpload");

// router
const router = require("express").Router();

router.get("/view", attendanceController.viewAttendance);

router.post(
  "/",
  uploadFile.array("dataFile", 1),
  attendanceController.uploadAttendance
);

module.exports = router;
