'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('denunciations_incidents', {
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
        allowNull: true,
      },
      incident: {
        type: Sequelize.INTEGER,
        references: {
          model: 'incidents',
          key: 'id',
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
          key: 'id',
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        allowNull: true,
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
    return queryInterface.dropTable('denunciations_incidents');
  },
};
