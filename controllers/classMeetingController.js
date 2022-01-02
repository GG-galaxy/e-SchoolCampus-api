const db = require("../models");

// create main Model
const ClassMeeting = db.classMeetings;

// main work

// 1. create classMeeting

const addClassMeeting = async (req, res) => {
  const data = req.body;

  let info = {
    name: data.name,
    timestamp: data.timestamp,
    duration: data.duration,
    batchId: data.batchId,
    teacherId: data.teacherId,
  };

  let classMeeting = null;
  try {
    classMeeting = await ClassMeeting.create(info);
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }
  res.status(200).send({
    success: true,
    code: 200,
    data: classMeeting,
  });
};

// get all class meetings

const getAllClassMeetings = async (req, res) => {
  let classMeetings = null;

  try {
    classMeetings = await ClassMeeting.findAll();
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (classMeetings) {
    res.status(200).send({
      success: true,
      code: 200,
      data: classMeetings,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};


// 3. get single classMeeting

const getOneClassMeeting = async (req, res) => {
  let id = req.params.id;
  let classMeeting = null;

  try {
    classMeeting = await ClassMeeting.findOne({ where: { id: id } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (classMeeting) {
    res.status(200).send({
      success: true,
      code: 200,
      data: classMeeting,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update classMeeting

const updateClassMeeting = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const classMeeting = await ClassMeeting.findOne({ where: { id: id } });

  if (!classMeeting) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await ClassMeeting.update(req.body, { where: { id: id } });
  } catch (err) {
    console.log("Error: ", err);

    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (result[0]) {
    res.status(200).send({
      success: true,
      code: 200,
    });
  } else {
    res.send({
      success: false,
      code: 400,
      message: "Error",
    });
  }
};

// 5. delete classMeeting by id

const deleteClassMeeting = async (req, res) => {
  let id = req.params.id;

  const classMeeting = await ClassMeeting.findOne({ where: { id: id } });

  if (!classMeeting) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await ClassMeeting.destroy({ where: { id: id } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  res.status(200).send({
    success: true,
    code: 200,
    message: "ClassMeeting is removed!",
  });
};

module.exports = {
  addClassMeeting,
  getAllClassMeetings,
  getOneClassMeeting,
  updateClassMeeting,
  deleteClassMeeting,
};
