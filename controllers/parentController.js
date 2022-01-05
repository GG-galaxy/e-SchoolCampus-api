const { students } = require("../models");
const db = require("../models");

// create main Model
const Parent = db.parents;
const Student = db.students;

// main work

// 1. create parent

const addParent = async (req, res) => {
  const data = req.body;

  let info = {
    id: data.id,
    name: data.name,
    email: data.email,
    address: data.address,
    contact: data.contact,
    studentId: data.studentId,
  };

  let parent = null;
  try {
    parent = await Parent.create(info);
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
    data: parent,
  });
};

// 3. get single parent

const getOneParent = async (req, res) => {
  let id = req.params.id;
  let parent = null;

  try {
    parent = await Parent.findByPk(id, {
      include: [{ model: Student }],
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

  if (parent) {
    res.status(200).send({
      success: true,
      code: 200,
      data: parent,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update parent

const updateParent = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const parent = await Parent.findOne({ where: { id: id } });

  if (!parent) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Parent.update(req.body, { where: { id: id } });
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

// 5. delete parent by id

const deleteParent = async (req, res) => {
  let id = req.params.id;

  const parent = await Parent.findOne({ where: { id: id } });

  if (!parent) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Parent.destroy({ where: { id: id } });
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
    message: "Parent is removed!",
  });
};

// 6. Update studentId
const updateStudentId = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const parent = await Parent.findOne({ where: { id: id } });

  if (!parent) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  const studentRollNo = req.body.rollNo;
  let student = null;
  if (studentRollNo) student = Student.findOne({ where: { rollNo: rollNo } });

  if (student) {
    parent.studentId = student.id;
  } else {
    res.send({
      success: false,
      code: 400,
      message: "Invalid roll number!",
    });

    return;
  }

  try {
    result = await Parent.update(parent, { where: { id: id } });
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

module.exports = {
  addParent,
  getOneParent,
  updateParent,
  deleteParent,
  updateStudentId,
};
