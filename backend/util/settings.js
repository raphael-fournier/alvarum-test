const settings = {
  database: {
    dbConnectionUri:
      process.env.DB_CONNECTION_URI ||
      "mariadb://root:password@127.0.0.1:3306/exercice?connectTimeout=5000&autoReconnect=true&timezone=Europe/Paris",
    logging: process.env.DB_LOGGING || false,
    timezone: process.env.DB_TIMEZONE || "Europe/Paris",
  },
  migration: {
    directory: process.env["MIGRATION_DIR"] || "./migrations",
    migrate: !process.env["MIGRATION_OFF"],
  },
  jwt: {
    secret: process.env.JWT_SECRET || "hGs7FkJctYeGHQ",
    algorithms: ["HS256"],
    expiresIn: process.env.JWT_EXPIRES_IN || 24 * 3600,
  },
  constants: {
    web: {
      port: process.env.PORT || 3000,
      logFormat: process.env.LOG_FORMAT || "dev",
    },
  },
};

module.exports = settings;
