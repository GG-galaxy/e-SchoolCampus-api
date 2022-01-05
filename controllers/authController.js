const db = require("../models");

// Models
const Student = db.students;
const Parent = db.parents;
const Teacher = db.teachers;
const Admin = db.admins;
const Batch = db.batchs;


// 1. get single user

const getUser = async (req, res) => {
  let id = req.params.id;
  let student = null,
    teacher = null,
    parent = null,
    admin = null;

  try {
    student = await Student.findByPk(id, {
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
      data: { userType: "student", data: student },
    });

    return;
  }

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
    res.send({
      success: true,
      code: 200,
      data: { userType: "teacher", data: teacher },
    });

    return;
  }

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
    res.send({
      success: true,
      code: 200,
      data: { userType: "parent", data: parent },
    });

    return;
  }

  try {
    admin = await Admin.findByPk(id);
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (admin) {
    res.send({
      success: true,
      code: 200,
      data: { userType: "admin", data: admin },
    });

    return;
  }

  res.send({
    success: false,
    code: 200,
    message: "No user found!",
  });
};

module.exports = {
  getUser,
};
