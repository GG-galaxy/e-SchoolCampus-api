// import controllers
var authRouter = require("./authRouter");
var studentRouter = require("./studentRouter");
var teacherRouter = require("./teacherRouter");
var parentRouter = require("./parentRouter");
var adminRouter = require("./adminRouter");
var batchRouter = require("./batchRouter");
var attendanceRouter = require("./attendanceRouter");
var marksheetRouter = require("./marksheetRouter");
var classMeetingRouter = require("./classMeetingRouter");

// router
const router = require("express").Router();

// use routers
router.get("/", (req, res) => {
  res.send("Server is Running");
});

router.use("/auth", authRouter);

router.use("/student", studentRouter);

router.use("/teacher", teacherRouter);

router.use("/parent", parentRouter);

router.use("/admin", adminRouter);

router.use("/batch", batchRouter);

router.use("/classmeeting", classMeetingRouter);

router.use("/marksheet", marksheetRouter);

router.use("/attendance", attendanceRouter);

module.exports = router;
