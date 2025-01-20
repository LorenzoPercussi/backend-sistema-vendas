const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Wine = sequelize.define(
  'Wine',
  {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Harvest: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Wine',
    timestamps: true,
  }
);

module.exports = Wine;
