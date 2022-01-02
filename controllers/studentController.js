const db = require("../models");

// create main Model
const Student = db.students;
const Batch = db.batchs;
const Parent = db.parents;

// main work

// 1. create student

const addStudent = async (req, res) => {
  const data = req.body;

  let info = {
    id: data.id,
    name: data.name,
    email: data.email,
    rollNo: data.rollNo,
    address: data.address,
    contact: data.contact,
    batchId: data.batchId,
  };

  let student = null;
  try {
    student = await Student.create(info);
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
    data: student,
  });
};

// 3. get single student

const getOneStudent = async (req, res) => {
  let id = req.params.id;
  let student = null;

  try {
    student = await Student.findOne({
      where: { id: id },
      include: [{ model: Batch }, { model: Parent }],
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (student) {
    res.status(200).send({
      success: true,
      code: 200,
      data: student,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update student

const updateStudent = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const student = await Student.findOne({ where: { id: id } });

  if (!student) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Student.update(req.body, { where: { id: id } });
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

// 5. delete student by id

const deleteStudent = async (req, res) => {
  let id = req.params.id;

  const student = await Student.findOne({ where: { id: id } });

  if (!student) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Student.destroy({ where: { id: id } });
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
    message: "Student is removed!",
  });
};

module.exports = {
  addStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
};
