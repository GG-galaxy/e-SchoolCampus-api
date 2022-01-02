module.exports = (sequelize, DataTypes) => {
  const ClassMeeting = sequelize.define("classMeeting", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });

  return ClassMeeting;
};
