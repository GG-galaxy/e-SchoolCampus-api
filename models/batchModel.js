module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define("batch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Batch;
};
