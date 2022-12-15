const chalk = require("chalk");
const settings = require("./settings");
const Umzug = require("umzug");

async function migrate(sequelize) {
  await new Umzug({
    migrations: {
      path: settings.migration.directory,
      params: [sequelize.getQueryInterface()],
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: sequelize,
    },
  })
    .on("migrated", (e) => console.log(chalk.green("✓  MIGRATION EXECUTED"), e))
    .up();
}

async function migrationHelper(sequelize) {
  if (settings.migration.migrate) {
    await migrate(sequelize);
  } else {
    console.log(chalk.yellow("⚠  MIGRATION execution is toggled off"));
  }
}

module.exports = migrationHelper;
