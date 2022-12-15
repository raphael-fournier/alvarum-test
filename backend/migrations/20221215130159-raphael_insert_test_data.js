module.exports = {
  up: async (q) => {
    await q.sequelize.query(
      `
      INSERT INTO events (id, name) VALUES
        (UUID(), 'Example Event 3'),
        (UUID(), 'Example Event 4');
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId, registration_number)
        SELECT UUID(), '+33699999999', 'Louis', 'Dubois', NULL, id, '123456'
        FROM events WHERE name='Example Event 3';
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId, registration_number)
        SELECT UUID(), '+33611223344', 'Louise', 'Morel', NULL, id, '112233'
        FROM events WHERE name='Example Event 4';
      `
    );
  },

  down: async () => {},
};
