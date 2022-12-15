const { Model, DataTypes } = require("sequelize");
const database = require("../util/database");
class Event extends Model {}
Event.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "events",
  }
);

module.exports = Event;
