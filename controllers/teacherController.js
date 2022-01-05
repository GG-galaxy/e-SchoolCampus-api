const db = require("../models");

// create main Model
const Teacher = db.teachers;

// main work

// 1. create teacher

const addTeacher = async (req, res) => {
  const data = req.body;

  let info = {
    id: data.id,
    name: data.name,
    email: data.email,
    address: data.address,
    contact: data.contact,
  };

  let teacher = null;
  try {
    teacher = await Teacher.create(info);
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
    data: teacher,
  });
};

// 3. get single teacher

const getOneTeacher = async (req, res) => {
  let id = req.params.id;
  let teacher = null;

  try {
    teacher = await Teacher.findByPk(id);
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (teacher) {
    res.status(200).send({
      success: true,
      code: 200,
      data: teacher,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update teacher

const updateTeacher = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const teacher = await Teacher.findOne({ where: { id: id } });

  if (!teacher) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Teacher.update(req.body, { where: { id: id } });
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

// 5. delete teacher by id

const deleteTeacher = async (req, res) => {
  let id = req.params.id;

  const teacher = await Teacher.findOne({ where: { id: id } });

  if (!teacher) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Teacher.destroy({ where: { id: id } });
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
    message: "Teacher is removed!",
  });
};

module.exports = {
  addTeacher,
  getOneTeacher,
  updateTeacher,
  deleteTeacher,
};
