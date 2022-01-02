// import controllers
const teacherController = require("../controllers/teacherController.js");

// router
const router = require("express").Router();

router.get("/:id", teacherController.getOneTeacher);

router.post("/", teacherController.addTeacher);

router.put("/:id", teacherController.updateTeacher);

router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
