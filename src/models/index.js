const { sequelize, syncDatabase } = require('../config/database');
const User = require('./User');
const Wine = require('./Wine');

module.exports = {
  sequelize,
  User,
  Wine,
};
