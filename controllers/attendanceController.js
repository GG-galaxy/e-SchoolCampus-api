const db = require("../models");

// create main Model
const Attendance = db.attendances;
const Student = db.students;

// main work

// 1. upload attendance

const uploadAttendance = async (req, res) => {
  const classMeetingId = req.body.classMeetingId;
  const files = req.files;

  const array = [];
  const fileData = files[0].buffer.toString("ascii");
  fileData.split("\r\n").forEach((line) => {
    const r = line.split(", ");
    const obj = {
      rollNo: r[0],
      presentDuration: r[1],
      classMeetingId: classMeetingId,
    };
    array.push(obj);
  });

  console.log(array);

  Attendance.bulkCreate(array)
    .then(() => {
      res.status(200).send({
        success: true,
        code: 200,
        data: null,
        message: "All records added successfully!",
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.send({
        success: false,
        code: 400,
        message: err.message,
      });
    });
};

// 3. view attendance

const viewAttendance = async (req, res) => {
  const studentRollNo = req.query.rollNo;
  let attendance = null;

  let student = null;
  if (studentRollNo)
    student = Student.findOne({ where: { rollNo: studentRollNo } });

  if (!student) {
    res.send({
      success: false,
      code: 400,
      message: "Invalid roll number!",
    });

    return;
  }

  try {
    attendance = await Attendance.findAll({ where: { rollNo: studentRollNo } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (attendance) {
    res.status(200).send({
      success: true,
      code: 200,
      data: attendance,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

module.exports = {
  uploadAttendance,
  viewAttendance,
};
