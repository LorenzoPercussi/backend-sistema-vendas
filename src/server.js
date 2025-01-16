const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');
const authRoutes = require('./routes/auth.route');
const saleRoutes = require('./routes/sale.route');
const wineRoutes = require('./routes/wine.route');
const userRoutes = require('./routes/user.route');
const { syncDatabase } = require('./config/database');
require('dotenv').config();

const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/wine', wineRoutes);

(async () => {
  await syncDatabase();
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/swagger`);
});
