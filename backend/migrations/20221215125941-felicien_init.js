module.exports = {
  up: async (q) => {
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `events` (`id` CHAR(36) NOT NULL , `name` VARCHAR(30) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;"
    );
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `users` (`id` CHAR(36) NOT NULL , `phone_number` VARCHAR(30) NOT NULL, `first_name` VARCHAR(255), `last_name` VARCHAR(255), `last_connected` DATETIME, `eventId` CHAR(36) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;"
    );
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `codes` (`id` CHAR(36) NOT NULL , `code` VARCHAR(30) NOT NULL, `userId` CHAR(36) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;"
    );
  },
  down: async (q) => {
    await q.sequelize.query("DROP TABLE IF EXISTS `events`;");
    await q.sequelize.query("DROP TABLE IF EXISTS `users`;");
    await q.sequelize.query("DROP TABLE IF EXISTS `codes`;");
  },
};
