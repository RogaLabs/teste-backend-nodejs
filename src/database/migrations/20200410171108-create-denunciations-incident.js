'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('denunciations_incident', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      denunciant: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      incident: {
        type: Sequelize.INTEGER,
        references: {
          model: 'incident',
          key: 'id',
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'address',
          key: 'id',
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('denunciations_incident');
  },
};
