// import controllers
const studentController = require("../controllers/studentController.js");

// router
const router = require("express").Router();

router.get("/search/roll/:roll", studentController.searchStudentWithRoll);

router.get("/:id", studentController.getOneStudent);

router.post("/", studentController.addStudent);

router.put("/:id", studentController.updateStudent);

router.delete("/:id", studentController.deleteStudent);

module.exports = router;
