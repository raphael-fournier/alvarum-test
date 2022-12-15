const settings = require("./settings");
const chalk = require("chalk");
const Sequelize = require("sequelize");
const migration = require("./migration");

const sequelize = new Sequelize(settings.database.dbConnectionUri, {
  logging: settings.database.logging,
  timezone: settings.database.timezone,
  pool: settings.database.pool,
  dialectOptions: {
    connectTimeout: settings.database.connectTimeout,
  },
  define: { timestamps: false },
});

sequelize
  .authenticate()
  .catch((err) => {
    sequelize.database_error = "DB_CONNECTION_FAILED";
    console.log(chalk.bold.red("Database connection failed:"), chalk.red(err));
  })
  .then(() => migration(sequelize))
  .catch((err) => {
    sequelize.database_error = "MIGRATION_FAILED";
    console.log(chalk.bold.red("Migration failed:"), chalk.red(err));
  });

module.exports = sequelize;
