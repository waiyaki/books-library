const cuid = require('cuid');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('genres', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(25),
        defaultValue: () => cuid(),
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      description: {
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
    return queryInterface.dropTable('genres');
  },
};
