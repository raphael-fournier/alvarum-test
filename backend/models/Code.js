const { Model, DataTypes } = require("sequelize");
const database = require("../util/database");
const User = require("./User");
class Code extends Model {}
Code.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "codes",
  }
);

Code.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

User.hasMany(Code);
module.exports = Code;
