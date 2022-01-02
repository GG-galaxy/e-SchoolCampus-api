// import controllers
const classMeetingController = require("../controllers/classMeetingController.js");

// router
const router = require("express").Router();

router.get("/all", classMeetingController.getAllClassMeetings);

router.get("/:id", classMeetingController.getOneClassMeeting);

router.post("/", classMeetingController.addClassMeeting);

router.put("/:id", classMeetingController.updateClassMeeting);

router.delete("/:id", classMeetingController.deleteClassMeeting);

module.exports = router;
