const db = require("../models");

// create main Model
const Marksheet = db.marksheets;
const Student = db.students;

// main work

// 1. create marksheet

const addMarksheet = async (req, res) => {
  const data = req.body;

  let info = {
    examName: data.examName,
    english: data.english,
    hindi: data.hindi,
    bengali: data.bengali,
    physics: data.physics,
    chemistry: data.chemistry,
    mathematics: data.mathematics,
    totalMarks: data.totalMarks,
    obtainedMarks: data.obtainedMarks,
  };

  const studentRollNo = data.rollNo;
  let student = null;
  if (studentRollNo) student = await Student.findOne({ where: { rollNo: studentRollNo } });

  if (student) {
    info.studentId = student.id;
  } else {
    res.send({
      success: false,
      code: 400,
      message: "Invalid roll number!",
    });

    return;
  }

  let marksheet = null;
  try {
    marksheet = await Marksheet.create(info);
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
    data: marksheet,
  });
};

// get all marksheet for a student
const getAllMarksheets = async (req, res) => {
  const studentRollNo = req.body.rollNo;
  let student = null;
  if (studentRollNo) student = await Student.findOne({ where: { rollNo: studentRollNo } });

  if (!student) {
    res.send({
      success: false,
      code: 400,
      message: "Invalid roll number!",
    });

    return;
  }

  let marksheets = null;

  try {
    marksheets = await Marksheet.findAll({ where: { id: student.id } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (marksheets) {
    res.status(200).send({
      success: true,
      code: 200,
      data: marksheets,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 3. get single marksheet

const getOneMarksheet = async (req, res) => {
  let id = req.params.id;
  let marksheet = null;

  try {
    marksheet = await Marksheet.findOne({ where: { id: id } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (marksheet) {
    res.status(200).send({
      success: true,
      code: 200,
      data: marksheet,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update marksheet

const updateMarksheet = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const marksheet = await Marksheet.findOne({ where: { id: id } });

  if (!marksheet) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Marksheet.update(req.body, { where: { id: id } });
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

// 5. delete marksheet by id

const deleteMarksheet = async (req, res) => {
  let id = req.params.id;

  const marksheet = await Marksheet.findOne({ where: { id: id } });

  if (!marksheet) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Marksheet.destroy({ where: { id: id } });
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
    message: "Marksheet is removed!",
  });
};

module.exports = {
  addMarksheet,
  getAllMarksheets,
  getOneMarksheet,
  updateMarksheet,
  deleteMarksheet,
};
