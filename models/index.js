const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected..");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./studentModel.js")(sequelize, DataTypes);
db.teachers = require("./teacherModel.js")(sequelize, DataTypes);
db.parents = require("./parentModel.js")(sequelize, DataTypes);
db.admins = require("./adminModel.js")(sequelize, DataTypes);
db.batchs = require("./batchModel.js")(sequelize, DataTypes);
db.classMeetings = require("./classMeetingModel.js")(sequelize, DataTypes);
db.attendances = require("./attendanceModel.js")(sequelize, DataTypes);
db.marksheets = require("./marksheetModel.js")(sequelize, DataTypes);
db.batchTeachers = require("./batchTeacherModel.js")(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Re-sync done!");
  })
  .catch((err) => {
    console.log("Sync Error: " + err);
  });

// Associations
db.students.belongsTo(db.batchs);
db.students.hasOne(db.parents);

db.parents.belongsTo(db.students);

db.teachers.hasMany(db.classMeetings);

// db.teachers.belongsToMany(db.batchs, { through: "batchTeachers" });
db.batchTeachers.belongsTo(db.teachers);
db.batchTeachers.belongsTo(db.batchs);

db.classMeetings.belongsTo(db.batchs);
db.classMeetings.belongsTo(db.teachers);
db.classMeetings.hasMany(db.attendances);

db.attendances.belongsTo(db.classMeetings);
db.attendances.belongsTo(db.students, {
  foreignKey: "rollNo",
  targetKey: "rollNo",
});

db.marksheets.belongsTo(db.students);

module.exports = db;
