const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Configuração da conexão usando DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,       
    min: 0,       
    acquire: 30000,
    idle: 10000,
  },
});

// Testa a conexão com o banco
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Sincroniza os modelos com o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Atualiza as tabelas existentes
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = { sequelize, syncDatabase };

