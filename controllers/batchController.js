const db = require("../models");

// create main Model
const Batch = db.batchs;
const Teacher = db.students;
const batchTeacher = db.batchTeachers;

// main work

// 1. create batch

const addBatch = async (req, res) => {
  const data = req.body;

  let info = {
    id: data.id,
    name: data.name,
    session: data.session,
  };

  let batch = null;
  try {
    batch = await Batch.create(info);
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
    data: batch,
  });
};

// 3. get single batch

const getOneBatch = async (req, res) => {
  let id = req.params.id;
  let batch = null;

  try {
    batch = await Batch.findOne({ where: { id: id } });
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (batch) {
    res.status(200).send({
      success: true,
      code: 200,
      data: batch,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update batch

const updateBatch = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const batch = await Batch.findOne({ where: { id: id } });

  if (!batch) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Batch.update(req.body, { where: { id: id } });
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

// 5. delete batch by id

const deleteBatch = async (req, res) => {
  let id = req.params.id;

  const batch = await Batch.findOne({ where: { id: id } });

  if (!batch) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Batch.destroy({ where: { id: id } });
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
    message: "Batch is removed!",
  });
};

// 6. get all batches

const getAllBatches = async (req, res) => {
  let batches = null;

  try {
    batches = await Batch.findAll();
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });

    return;
  }

  if (batches) {
    res.status(200).send({
      success: true,
      code: 200,
      data: batches,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 7. add teacher to batch
const addBatchTeachers = async (req, res) => {
  const data = req.body;

  try {
    const batch = await Batch.findOne({ where: { id: data.batchId } });
    const teacher = await Teacher.findOne({ where: { id: data.teacherId } });

    const obj = { teacherId: teacher.id, batchId: batch.id, role: data.role };
    const result = await batchTeacher.create(obj);

    if (result) {
      res.send({
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
  } catch (err) {
    console.log("Error: ", err);
    res.send({
      success: false,
      code: 400,
      message: err.message,
    });
  }
};

module.exports = {
  addBatch,
  getAllBatches,
  getOneBatch,
  updateBatch,
  deleteBatch,
  addBatchTeachers,
};
