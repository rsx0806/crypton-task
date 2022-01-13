'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Grades', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Profiles',
          key: 'id',
        }
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Profiles',
          key: 'id',
        }
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lesson: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Grades');
  }
};