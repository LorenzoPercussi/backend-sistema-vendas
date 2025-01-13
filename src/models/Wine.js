const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Wine = sequelize.define('Wine', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harvest: {
    type: DataTypes.BIGINT,
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
