module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("attendance", {
    presentDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Attendance;
};
