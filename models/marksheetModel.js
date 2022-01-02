module.exports = (sequelize, DataTypes) => {
  const Marksheet = sequelize.define("marksheet", {
    examName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    english: {
      type: DataTypes.INTEGER,
    },
    hindi: {
      type: DataTypes.INTEGER,
    },
    bengali: {
      type: DataTypes.INTEGER,
    },
    physics: {
      type: DataTypes.INTEGER,
    },
    chemistry: {
      type: DataTypes.INTEGER,
    },
    mathematics: {
      type: DataTypes.INTEGER,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    obtainedMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Marksheet;
};
