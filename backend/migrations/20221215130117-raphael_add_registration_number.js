/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (q) => {
    await q.sequelize.query(
      `
      ALTER TABLE users ADD COLUMN registration_number VARCHAR(8);
      `
    );
  },

  down: async () => {},
};
