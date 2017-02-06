const cuid = require('cuid');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(25),
        defaultValue: () => cuid(),
      },
      title: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('books');
  },
};
