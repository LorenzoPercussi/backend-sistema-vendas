const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Wine = sequelize.define('Wine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harvest: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Wine',
  timestamps: true,
});

module.exports = Wine;
