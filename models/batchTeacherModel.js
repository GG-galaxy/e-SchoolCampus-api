module.exports = (sequelize, DataTypes) => {
  const BatchTeachers = sequelize.define("batchTeachers", {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SubjectTeacher",
    },
  });

  return BatchTeachers;
};
