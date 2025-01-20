const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Client = sequelize.define(
  'Client',
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Client',
    timestamps: true,
  }
);

module.exports = Client;
