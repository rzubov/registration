'use strict';

module.exports = {
  /**
   *
   * @param queryInterface
   * @param DataTypes
   *
   * @returns {*}
   */
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('registration', {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      code_sms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code_email: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      code_valid_to: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }).then(() => queryInterface.addIndex(
        'registration',
        ['email'],
        {
          name: 'idx-registration-email',
          type: 'UNIQUE'
        }
    )).then(() =>
        queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    )
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('registration');
  }
};
