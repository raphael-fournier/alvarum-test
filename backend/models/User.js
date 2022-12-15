const { Model, DataTypes } = require("sequelize");
const database = require("../util/database");
const Event = require("./Event");
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    phone_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_connected: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    registration_number: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "users",
  }
);

User.belongsTo(Event, {
  foreignKey: {
    allowNull: false,
  },
});

Event.hasMany(User);

module.exports = User;
