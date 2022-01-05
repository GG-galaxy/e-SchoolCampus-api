const db = require("../models");

// create main Model
const Admin = db.admins;

// main work

// 1. create admin

const addAdmin = async (req, res) => {
  const data = req.body;

  let info = {
    id: data.id,
    name: data.name,
    email: data.email,
    address: data.address,
    contact: data.contact,
  };

  let admin = null;
  try {
    admin = await Admin.create(info);
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
    data: admin,
  });
};

// 3. get single admin

const getOneAdmin = async (req, res) => {
  let id = req.params.id;
  let admin = null;

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
    res.status(200).send({
      success: true,
      code: 200,
      data: admin,
    });
  } else {
    res.status(200).send({
      success: false,
      code: 200,
      message: "Not found!",
    });
  }
};

// 4. update admin

const updateAdmin = async (req, res) => {
  let id = req.params.id;
  let result = null;

  const admin = await Admin.findOne({ where: { id: id } });

  if (!admin) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    result = await Admin.update(req.body, { where: { id: id } });
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

// 5. delete admin by id

const deleteAdmin = async (req, res) => {
  let id = req.params.id;

  const admin = await Admin.findOne({ where: { id: id } });

  if (!admin) {
    res.send({
      success: false,
      code: 400,
      message: "User not found!",
    });

    return;
  }

  try {
    await Admin.destroy({ where: { id: id } });
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
    message: "Admin is removed!",
  });
};

module.exports = {
  addAdmin,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
